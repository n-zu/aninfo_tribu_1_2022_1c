import { useState, useMemo } from "react";
import type { NextPage } from "next";
import { Alert, Box, Typography, Button } from "@mui/material";
import { useTask, useTaskTRs } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import Loading from "../../components/common/Loading";
import TaskModal from "../../components/projects/tasks/TaskModal";
import TitledText from "../../components/common/TitledText";
import Link from "next/link";
import StateChip from "../../components/projects/StateChip";
import styles from "../../styles/Project.module.css";
import Collaborators from "../../components/projects/tasks/Collaborators";
import AssociatedTickets from "../../components/projects/tasks/AssociatedTickets";
import EmployeeAvatar from "../../components/projects/tasks/EmployeeAvatar";
import { projectsApi } from "../../services/requests";

type Props = {
  task: any;
  taskId: string;
};

const Task: NextPage<Props> = ({ taskId, task: initialTask }) => {
  const { task, error, loading, mutate } = useTask(taskId);
  const [open, setOpen] = useState(false);
  const { totalTime } = useTaskTRs(parseInt(taskId));
  const onHours = () => {
    console.log("Cargar horas");
  };

  const worked_hours = useMemo(() => {
    if (!task?.estimated_hours) return `${totalTime} (no hay estimación)`;

    return `${totalTime} (${((totalTime / task?.estimated_hours) * 100).toFixed(
      0
    )}% de las estimadas)`;
  }, [totalTime, task?.estimated_hours]);

  return (
    <div className="page">
      {loading ? <Loading style={{ marginTop: "30px" }} /> : ""}
      {error && !task ? (
        <Alert severity="error" style={{ width: "100%", marginTop: "10px" }}>
          No se pudo cargar la tarea
        </Alert>
      ) : null}
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
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ height: "fit-content" }}
                onClick={() => setOpen(true)}
              >
                Editar Tarea
              </Button>
              <Link
                href={
                  "/rrhh?cargarEn=" +
                  task?.project?.id +
                  "-" +
                  task?.project?.name +
                  "-" +
                  task?.id +
                  "-" +
                  task?.name
                }
                style={
                  !task?.project?.id || !task?.id
                    ? {
                        pointerEvents: "none",
                      }
                    : {}
                }
              >
                <a>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: "fit-content" }}
                    onClick={onHours}
                    disabled={!task?.project?.id || !task?.id}
                  >
                    Cargar horas
                  </Button>
                </a>
              </Link>
            </div>
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
                <TitledText title="Horas Trabajadas">{worked_hours}</TitledText>
                <EmployeeAvatar id={task?.assigned_employee as any} />
              </Box>

              <TitledText title="Descripción">{task?.description}</TitledText>
            </div>

            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {task ? <Collaborators task={task} mutate={mutate} /> : null}
              {task?.id ? <AssociatedTickets taskId={task.id} /> : null}
            </Box>
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

export async function getServerSideProps({ query }: any) {
  const taskId = query?.id ?? "";

  const task = await fetch(projectsApi + "/tasks/" + taskId).then((res) => {
    if (res.ok) return res.json();
    return null;
  });

  return {
    props: {
      taskId,
      task,
    },
  };
}
