import Modal from "../../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../../common/Form/FormField";
import { Button, Typography, Avatar, Box } from "@mui/material";
import { saveTask } from "../../../services/projects";
import { toast } from "react-toastify";
import { Task } from "../../../services/types";
import { capitalize, zeroPad } from "../../../util/util";
import { useEmployees } from "../../../services/projects";

// el orden en el que aparecen los estados acá
// se usa para ordenarlos en la lista
export const TASK_STATES = [
  "bloqueada",
  "en progreso",
  "sin iniciar",
  "finalizada",
  "cancelada",
];

type Props = {
  projectId?: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  task?: Task;
};

const TaskModal = ({ projectId, open, onClose, onSave, task }: Props) => {
  const creating = task == null;
  const { employees, loadingEmployee, error } = useEmployees();

  const initialValues = {
    name: task?.name ?? "",
    state: task?.state ?? null,
    initial_date: task?.initial_date ?? "",
    final_date: task?.final_date ?? "",
    estimated_hours: task?.estimated_hours ?? "",
    description: task?.description ?? "",
    assigned_employee: task?.assigned_employee ?? null,
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) errors.name = "Requerido";
    if (!values.state) errors.state = "Requerido";
    if (!values.initial_date) errors.initial_date = "Requerido";
    if (!values.final_date) errors.final_date = "Requerido";
    if (values.final_date < values.initial_date)
      errors.final_date =
        "La fecha de finalización debe ser mayor a la de inicio";
    if (!values.description) errors.description = "Requerido";
    if (values.estimated_hours && values.estimated_hours < 0)
      errors.estimated_hours = "Debe ser mayor o igual a 0";
    return errors;
  };

  const onSubmit = async (values: any) => {
    try {
      await saveTask(values, projectId, task?.id);
      toast.success("Tarea guardada correctamente");
      onSave?.();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Error al guardar la tarea");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Typography variant="h5">
        {creating ? "Nueva" : "Editar"} Tarea
      </Typography>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <FormField name="name" label="Nombre" />
              <FormField
                name="state"
                label="Estado"
                type="autocomplete"
                options={TASK_STATES}
                getOptionLabel={capitalize}
                setFieldValue={setFieldValue}
              />
              <FormField
                name="initial_date"
                type="date"
                label="Fecha de inicio"
              />
              <FormField name="final_date" type="date" label="Fecha de fin" />
              <FormField
                name="estimated_hours"
                type="number"
                inputProps={{ min: "0" }}
                placeholder="0"
                InputLabelProps={{ shrink: true }}
                label="Horas estimadas"
              />
              <FormField
                name="assigned_employee"
                type="autocomplete"
                label={employeeLabel(loadingEmployee, error)}
                options={employees.map((e) => e.id)}
                getOptionLabel={(id: any) => {
                  const employee = employees.find((e) => e?.id === id);
                  return `${zeroPad(employee?.id ?? 0)} - ${employee?.name} ${
                    employee?.lastname
                  }`;
                }}
                renderOption={(props: any, option: any) =>
                  renderOption(
                    props,
                    employees.find((e) => e?.id === option)
                  )
                }
                setFieldValue={setFieldValue}
                disabled={loadingEmployee || error}
              />
              <FormField
                name="description"
                label="Descripción"
                multiline
                maxRows={5}
              />
            </div>
            <br />
            <Button variant="contained" color="primary" type="submit">
              Guardar Tarea
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const employeeLabel = (loading: boolean, error: any) => {
  if (loading) return "Cargando...";
  if (error) return "Error cargando empleados";
  return "Empleado asignado";
};

const renderOption = (props: any, option: any) => {
  const employee = `${zeroPad(option?.id)} - ${option?.name} ${
    option?.lastname
  }`;
  return (
    <Box
      component="li"
      style={{ display: "flex", alignItems: "center", gap: "5px" }}
      {...props}
    >
      <Avatar style={{ transform: "scale(0.7)", backgroundColor: "gray" }}>
        {option?.name?.[0]}
      </Avatar>
      <Typography>{employee}</Typography>
    </Box>
  );
};

export default TaskModal;
