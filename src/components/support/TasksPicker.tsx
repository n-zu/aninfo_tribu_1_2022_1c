import { Chip, Typography } from "@mui/material";
import { useTask } from "@services/projects";
import { supportAPIUrl } from "@services/support";
import { useState } from "react";
import { toast } from "react-toastify";

const TaskChip = ({ task_id, deleteTask }: any) => {
  const { task } = useTask(task_id);

  return (
    <Chip
      label={`${task_id} ${task?.name}` ?? ""}
      onDelete={() => deleteTask(task_id)}
    />
  );
};

const TasksPicker = ({ ticket }: any) => {
  const initialTasks = ticket?.tasks ?? [];

  const [tasks, setTasks] = useState(initialTasks);

  const addTask = async () => {
    // TODO: Mostrar un dialogo para seleccionar una tarea
    const task = await prompt("Ingrese el id de la tarea");

    if (!task) return;

    await fetch(`${supportAPIUrl}/tickets/${ticket.id}/tasks?task_id=${task}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setTasks([...tasks, task]);
    toast.success("Tarea agregada exitosamente");
  };

  const deleteTask = async (task_id: number) => {
    await fetch(
      `${supportAPIUrl}/tickets/${ticket?.id}/tasks?task_id=${task_id}`,
      {
        method: "DELETE",
      }
    );
    setTasks(tasks.filter((task: number) => task !== task_id));
    toast.success("Tarea borrada exitosamente");
  };

  return (
    <Typography>
      Tarea/s:{" "}
      {tasks.map((task: number) => (
        <TaskChip key={task} task_id={task} deleteTask={deleteTask} />
      ))}
      <Chip label="+" onClick={addTask} />
    </Typography>
  );
};

export default TasksPicker;
