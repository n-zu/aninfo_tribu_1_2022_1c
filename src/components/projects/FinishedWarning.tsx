import Alert from "@mui/material/Alert";
import { Task } from "../../services/types";
import { Tooltip } from "@mui/material";
import { zeroPad } from "../../util/util";

type Props = {
  tasks?: Task[];
  state?: string | null;
};

const FinishedWarning = ({ tasks, state }: Props) => {
  const notFinishedTasks = tasks?.filter(
    (task) => task.state !== "finalizada" && task.state !== "cancelada"
  );

  if (
    (state === "finalizado" || state === "cancelado") &&
    notFinishedTasks &&
    notFinishedTasks.length > 0
  )
    return (
      <>
        <Tooltip
          title={
            <>
              Tareas pendientes:
              <br />
              {notFinishedTasks.map((t) => (
                <>
                  {zeroPad(t?.id ?? 0)} - {t.name}
                  <br />
                </>
              ))}
            </>
          }
          placement="right"
          style={{
            width: "100%",
            height: "fit-content",
            alignSelf: "flex-end",
          }}
        >
          <Alert severity="warning">
            Se está concluyendo el proyecto, pero hay {notFinishedTasks.length}{" "}
            tareas pendientes
          </Alert>
        </Tooltip>

        <br />
      </>
    );

  return null;
};

export default FinishedWarning;
