import type { NextPage } from "next";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar
} from "@material-ui/core";
import { useTask } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import Loading from "../../components/common/Loading";
import TaskModal from "../../components/projects/tasks/TaskModal";
import TitledText from "../../components/common/TitledText";

let colabs: string[] = ["roberto", "german", "sergio villagra"];

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router?.query?.id as string;
  const { task, error, loading, mutate } = useTask(taskId);
  const [open, setOpen] = useState(false);

  const onHours = () => {
    console.log("employees");
  };

  const onDeleteColab = (name: String) => {
    console.log("delete " + name)
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
              <TitledText title="Fecha de inicio">
                {task?.initial_date}
              </TitledText>
              <TitledText title="Fecha de fin">{task?.final_date}</TitledText>
              <TitledText title="Horas estimadas">
                {task?.estimated_hours}
              </TitledText>
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
              <div>
                {colabs?.map((colab: string, index: number) => (
                  <Chip key={index} label={colab} onDelete={() => onDeleteColab(colab)} avatar={<Avatar>{colab[0].toUpperCase()}</Avatar> } />
                ))}
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
