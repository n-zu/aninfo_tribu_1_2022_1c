import { Chip, CircularProgress, Typography } from "@mui/material";
import { useTask } from "@services/projects";
import { supportAPIUrl } from "@services/support";
import { toast } from "react-toastify";

const TaskChip = ({ task_id, deleteTask }: any) => {
  const { task, error, loading, ...rest } = useTask(task_id);
  
  if(!task){

    if(!loading) {
      deleteTask(task_id)
      toast.error("La tarea que intenta agregar no existe");
    }
    return(
        <CircularProgress style={{width: 20, height: 20, marginLeft: 10, marginRight: 10}} />
    )
  }
    
  return (
    <Chip
      label={`${task_id} ${task?.name}` ?? ""}
      onDelete={() => deleteTask(task_id)}
    />
  );
};

const TasksPicker = ({ ticket, setTasks, tasks }: any ) => {
  const initialTasks = ticket?.tasks ?? [];


  const addTask = async () => {


    // TODO: Mostrar un dialogo para seleccionar una tarea
    const taskId = await prompt("Ingrese el id de la tarea");

    if (!taskId) return;

    

    if(ticket.id) {
      await fetch(`${supportAPIUrl}/tickets/${ticket.id}/tasks?task_id=${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
    
    setTasks([...tasks, taskId]);
  };

  const deleteTask = async (task_id: number) => {
    if (ticket.id) {
      await fetch(
        `${supportAPIUrl}/tickets/${ticket?.id}/tasks?task_id=${task_id}`,
        {
          method: "DELETE",
        }
      )
      
    }
    setTasks(tasks.filter((task: number) => task !== task_id));
    
  };

  return (
    <Typography component={'span'}>
      Tarea/s:{" "}
      {tasks.map((task: number) => (
        <TaskChip key={task} task_id={task} deleteTask={deleteTask} />
      ))}
      <Chip label="+" onClick={addTask} />
    </Typography>
  );
};

export default TasksPicker;
