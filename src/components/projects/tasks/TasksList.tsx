import { Box, Typography } from "@mui/material";
import { Task } from "../../../services/types";
import InfoCard from "../Card";
import Loading from "../../common/Loading";
import Caption from "../../common/Caption";
import Alert from "@mui/material/Alert";
import styles from "../Projects.module.css";
import { pluralize } from "../../../util/util";
import { TASK_STATES } from "./TaskModal";

type TasksListProps = {
  tasks: Task[];
  error?: any;
  loading?: boolean;
};

const TasksList = ({ tasks, error, loading }: TasksListProps) => {
  return (
    <>
      {loading && !error ? <Loading /> : ""}
      {error ? (
        <Alert severity="error" style={{ width: "100%" }}>
          No se pudieron cargar las tareas
        </Alert>
      ) : null}
      <div className={styles.TasksList + " flexContainer"}>
        {tasks?.sort(sortFn).map((task: Task, i: number) => (
          <InfoCard key={i} info={task} link="/projects/task?id=">
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
              }}
            >
              <Typography variant="caption">
                {pluralize(
                  "colaborador",
                  task?.collaborators ? task?.collaborators?.length : 0,
                  "es"
                )}
              </Typography>
            </Box>
          </InfoCard>
        ))}
        <Caption>{tasks?.length === 0 ? "No hay tareas" : ""}</Caption>
      </div>
    </>
  );
};

function sortFn(a: Task, b: Task) {
  return TASK_STATES.indexOf(a.state) - TASK_STATES.indexOf(b.state);
}

export default TasksList;
