import type { NextPage } from "next";
import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTask, useTaskTRs } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import Loading from "../../components/common/Loading";
import TaskModal from "../../components/projects/tasks/TaskModal";
import TitledText from "../../components/common/TitledText";
import Link from "next/link";
import StateChip from "../../components/projects/StateChip";
import styles from "../../styles/Project.module.css";
import Collaborators from "../../components/projects/Collaborators";

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router?.query?.id as string;
  const { task, error, loading, mutate } = useTask(taskId);
  const [open, setOpen] = useState(false);
  const { totalTime } = useTaskTRs(parseInt(taskId));

  const onHours = () => {
    console.log("Cargar horas");
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
            {task ? <Collaborators task={task} mutate={mutate} /> : null}
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
