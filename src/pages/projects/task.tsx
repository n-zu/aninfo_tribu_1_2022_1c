import type { NextPage } from "next";
import { useState } from "react";
import { Box, Typography, Button, Chip, Avatar } from "@mui/material";
import {
  useTask,
  useEmployees,
  deleteCollaborator,
  addCollaborator,
  useTaskTRs,
} from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import Loading from "../../components/common/Loading";
import TaskModal from "../../components/projects/tasks/TaskModal";
import TitledText from "../../components/common/TitledText";
import { Employee, EmployeeId } from "../../services/types";
import { toast } from "react-toastify";
import AutoComplete from "../../components/common/AutoComplete";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import StateChip from "../../components/projects/StateChip";

import styles from "../../styles/Project.module.css";

type Tag = {
  id: number;
  name: string;
};

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router?.query?.id as string;
  const { task, error, loading, mutate } = useTask(taskId);
  const [open, setOpen] = useState(false);
  const { employees } = useEmployees();
  const { totalTime } = useTaskTRs(parseInt(taskId));

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

  const employeeList = getEmployeeList(task?.collaborators, employees);

  const onHours = () => {
    console.log(employees);
  };

  const onDeleteColab = async (id: number) => {
    if (!id) return;
    console.log("delete " + id);
    try {
      await deleteCollaborator(id, taskId);
      toast.success("Colaborador eliminado correctamente");
      mutate();
    } catch (e) {
      console.error(e);
      toast.error("Error al eliminar colaborador");
    }
  };

  const onAddColab = async (id: number) => {
    console.log("add " + id);
    if (!id) return;
    try {
      await addCollaborator(id, taskId);
      toast.success("Colaborador agregado correctamente");
      mutate();
    } catch (e) {
      console.error(e);
      toast.error("Error al agregar colaborador");
    }
  };

  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      {task && (
        <>
          <Box
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link
                href={
                  "/projects/project?id=" +
                  task?.project?.id +
                  "&lastTask=" +
                  taskId
                }
              >
                <a>
                  <Typography variant="h4" className={styles.ProjectSubtitle}>
                    {zeroPad(task?.project?.id ?? 0)} - {task?.project?.name}
                  </Typography>
                </a>
              </Link>

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" style={{ marginRight: "15px" }}>
                  {zeroPad(task?.id ?? 0)} - {task?.name}
                </Typography>
                <StateChip state={task?.state} />
              </Box>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ height: "fit-content" }}
              onClick={() => setOpen(true)}
            >
              Editar Tarea
            </Button>
          </Box>
          <div>
            <div>
              <Box className={styles.dataRow}>
                <TitledText title="Fecha de inicio">
                  {task?.initial_date}
                </TitledText>
                <TitledText title="Fecha de fin">{task?.final_date}</TitledText>
                <TitledText title="Horas estimadas">
                  {task?.estimated_hours}
                </TitledText>
                <TitledText title="Horas Trabajadas">
                  {totalTime} ({" "}
                  {((totalTime / task?.estimated_hours) * 100).toPrecision(2)} %
                  )
                </TitledText>
              </Box>
              <TitledText title="Descripción">{task?.description}</TitledText>
            </div>
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
                {task?.collaborators?.map(
                  (colab: EmployeeId, index: number) => {
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
                  }
                )}
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ height: "fit-content" }}
                onClick={onHours}
              >
                Cargar horas
              </Button>
            </div>
          </div>
          <TaskModal
            open={open}
            onClose={() => setOpen(false)}
            onSave={mutate}
            task={task}
          />
        </>
      )}
    </div>
  );
};

export default Task;
