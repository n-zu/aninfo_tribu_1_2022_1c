import type { NextPage } from "next";
import { useState } from "react";
import { Box, Typography, Button, ListItem, ListItemText, IconButton, ListItemIcon } from "@material-ui/core";
import { useTask } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import Loading from "../../components/common/Loading";
import TaskModal from "../../components/projects/tasks/TaskModal";
import TitledText from "../../components/common/TitledText";
import CloseIcon from '@mui/icons-material/Close';
const colabs: string[] = [
  "hola",
  "german",
  "asdasdasdasdasdasdasdaszd"
]

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router?.query?.id as string;
  const { task, error, loading, mutate } = useTask(taskId);
  const [open, setOpen] = useState(false);

  const onHours = () => {
    console.log("cargar horas");
  }

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
          <div>
          <div>
            <TitledText title="Fecha de inicio">{task?.initial_date}</TitledText>
            <TitledText title="Fecha de fin">{task?.final_date}</TitledText>
            <TitledText title="Horas estimadas">
              {task?.estimated_hours}
            </TitledText>
            <TitledText title="Descripción">{task?.description}</TitledText>
          </div>
          <div style={{width: "600px", padding: 2, marginTop: 20, marginBottom: 20}}>
            <>
            <Typography variant="overline" style={{ lineHeight: "normal" }}>
              Colaboradores
            </Typography>
            {colabs?.map((colab: string) => (
              <ListItem
              key={colab}
              divider
            >
              <ListItemText primary={colab} primaryTypographyProps={{ style: { whiteSpace: "normal" } }} style={{}}/>
              <ListItemIcon>
                <IconButton aria-label="deleteColaborator">
                  <CloseIcon/>
                </IconButton>
              </ListItemIcon>
            </ListItem>
            ))}
            </>
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
