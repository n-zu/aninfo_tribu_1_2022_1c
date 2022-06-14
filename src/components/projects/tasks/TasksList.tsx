import Link from "next/link";
import { Task } from "../../../services/types";
import { zeroPad } from "../../../util/util";
import Card from "../../common/Card";
import styles from "../Projects.module.css";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Link href={"/projects/task?id=" + task?.id}>
      <a className={styles.TaskCard}>
        <Card hover={true}>
          <h3>
            {zeroPad(task?.id ?? 0)} - {task.name}
          </h3>
          <p>Inicio : {task.initial_date}</p>
          <p>Fin : {task.final_date}</p>
        </Card>
      </a>
    </Link>
  );
};

type TasksListProps = {
  tasks: Task[];
  error?: any;
  loading?: boolean;
};

const TasksList = ({ tasks, error, loading }: TasksListProps) => {
  return (
    <div className={styles.TasksList + " flexContainer"}>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {tasks?.map((task: Task, i: number) => (
        <TaskCard key={i} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
