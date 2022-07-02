import Modal from "../../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../../common/Form/FormField";
import { Button, Typography } from "@mui/material";
import { saveTask } from "../../../services/projects";
import { toast } from "react-toastify";
import { Task } from "../../../services/types";
import { capitalize } from "../../../util/util";

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

  const initialValues = {
    name: task?.name ?? "",
    state: task?.state ?? null,
    initial_date: task?.initial_date ?? "",
    final_date: task?.final_date ?? "",
    estimated_hours: task?.estimated_hours ?? "",
    description: task?.description ?? "",
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
                label="Horas estimadas"
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

export default TaskModal;
