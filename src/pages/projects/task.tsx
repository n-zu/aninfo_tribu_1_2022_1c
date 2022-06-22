import type { NextPage } from "next";
import { useState } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { useTask } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import Loading from "../../components/common/Loading";
import TaskModal from "../../components/projects/tasks/TaskModal";

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router?.query?.id as string;
  const { task, error, loading, mutate } = useTask(taskId);
  const [open, setOpen] = useState(false);

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
            <Typography variant="h4" style={{ alignSelf: "center" }}>
              {zeroPad(task?.id ?? 0)} - {task?.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ height: "fit-content" }}
              onClick={() => setOpen(true)}
            >
              Editar Tarea
            </Button>
          </Box>
          <Typography variant="body1">
            Fecha de inicio: {task?.initial_date}
          </Typography>
          <Typography variant="body1">
            Fecha de fin: {task?.final_date}
          </Typography>
          <Typography variant="body1">
            Horas estimadas: {task?.estimated_hours}
          </Typography>
          <Box style={{ marginTop: "10px" }}>
            <Typography variant="body1">Description</Typography>
            <Typography variant="body2">{task?.description}</Typography>
          </Box>
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
