import { Typography, Chip, Avatar } from "@mui/material";
import AutoComplete from "../../common/AutoComplete";
import AddIcon from "@mui/icons-material/Add";
import { Task, Employee, EmployeeId } from "../../../services/types";
import {
  useEmployees,
  deleteCollaborator,
  addCollaborator,
} from "../../../services/projects";
import { toast } from "react-toastify";

type Props = {
  task: Task;
  mutate?: () => void;
};

type Tag = {
  id: number;
  name: string;
};

const Collaborators = ({ task, mutate }: Props) => {
  const { employees } = useEmployees();

  const getEmployeeNameById = (id: number) => {
    const employee = employees?.find((employee: Employee) => {
      return employee.id === id;
    });
    return employee?.name + " " + employee?.lastname;
  };

  const getEmployeeList = (
    colaborators: EmployeeId[],
    employees: Employee[]
  ) => {
    const list: Tag[] = employees
      ?.filter(
        (employee) => !colaborators?.some((colab) => colab.id == employee.id)
      )
      .map((employee) => ({
        id: employee.id,
        name: employee.name + " " + employee.lastname,
      }));
    return list;
  };

  const employeeList = getEmployeeList(task.collaborators, employees);

  const onDeleteColab = async (id: number) => {
    if (!id) return;
    console.log("delete " + id);
    try {
      await deleteCollaborator(id, String(task.id));
      toast.success("Colaborador eliminado correctamente");
      mutate && mutate();
    } catch (e) {
      console.error(e);
      toast.error("Error al eliminar colaborador");
    }
  };

  const onAddColab = async (id: number) => {
    console.log("add " + id);
    if (!id) return;
    try {
      await addCollaborator(id, String(task.id));
      toast.success("Colaborador agregado correctamente");
      mutate && mutate();
    } catch (e) {
      console.error(e);
      toast.error("Error al agregar colaborador");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 2,
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Typography variant="overline" style={{ lineHeight: "normal" }}>
        Colaboradores
      </Typography>
      <div style={{ marginTop: 10, marginBottom: 10, width: "50%" }}>
        <AutoComplete
          label="Agregar colaborador"
          options={employeeList}
          routeFunction={onAddColab}
          icon={<AddIcon />}
        />
      </div>
      <div>
        {task?.collaborators?.map((colab: EmployeeId, index: number) => {
          const name = getEmployeeNameById(colab.id);
          return (
            <Chip
              key={index}
              label={name}
              onDelete={() => onDeleteColab(colab.id)}
              avatar={<Avatar>{name[0].toUpperCase()}</Avatar>}
              style={{ margin: "2px" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collaborators;
