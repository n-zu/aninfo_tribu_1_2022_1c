import { Typography, Chip, Avatar } from "@mui/material";
import AutoComplete from "./AutoComplete";
import AddIcon from "@mui/icons-material/Add";
import { Employee, EmployeeId } from "../../services/types";
import { useEmployees } from "../../services/projects";
import { capitalize } from "../../util/util";
import { toast } from "react-toastify";

type Props = {
  addEmployee: (id: number) => Promise<void>;
  removeEmployee: (id: number) => Promise<void>;
  mutate?: () => void;
  name: string;
  title?: string;
  currentEmployees?: EmployeeId[];
};

type Tag = {
  id: number;
  name: string;
};

const EmployeeList = ({
  addEmployee,
  removeEmployee,
  name,
  title,
  mutate,
  currentEmployees,
}: Props) => {
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

  const employeeList = getEmployeeList(currentEmployees ?? [], employees);

  const onDeleteColab = async (id: number) => {
    if (!id) return;
    try {
      await removeEmployee(id);
      toast.success(`${capitalize(name)} eliminado correctamente`);
      mutate && mutate();
    } catch (e) {
      console.error(e);
      toast.error(`Error al eliminar ${name}`);
    }
  };

  const onAddColab = async (id: number) => {
    if (!id) return;
    try {
      await addEmployee(id);
      toast.success(`${capitalize(name)} agregado correctamente`);
      mutate && mutate();
    } catch (e) {
      console.error(e);
      toast.error(`Error al agregar ${name}`);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        padding: 30,
        paddingLeft: 0,
      }}
    >
      <Typography variant="overline" style={{ lineHeight: "normal" }}>
        {title}
      </Typography>
      <div style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
        <AutoComplete
          label={`Agregar ${name}`}
          options={employeeList}
          routeFunction={onAddColab}
          icon={<AddIcon />}
        />
      </div>
      <div>
        {currentEmployees?.map((colab: EmployeeId, index: number) => {
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

export default EmployeeList;
