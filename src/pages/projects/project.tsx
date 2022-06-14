import type { NextPage } from "next";

import { useProject } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import ListBar from "../../components/common/ListBar";
import { useState } from "react";
import NewTaskModal from "../../components/projects/tasks/NewTaskModal";
import TasksList from "../../components/projects/tasks/TasksList";
import { Task } from "../../services/types";

type TasksProps = {
  projectId: string;
  tasks: Task[];
};
const Tasks = ({ projectId, tasks }: TasksProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListBar handleNew={() => setOpen(true)} label="tarea" />
      <TasksList tasks={tasks} />
      <NewTaskModal
        open={open}
        onClose={() => setOpen(false)}
        projectId={projectId}
      />
    </>
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const projectId = router?.query?.id as string;
  const { project, error, loading } = useProject(projectId);

  return (
    <div className="page">
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {project && (
        <>
          <h1>
            {zeroPad(project?.id ?? 0)} - {project?.name}
          </h1>
          <p>initial_date {project?.initial_date}</p>
          <p>final_date {project?.final_date}</p>
          <p>estimated_hours {project?.estimated_hours}</p>
          <Tasks projectId={projectId} tasks={project?.tasks ?? []} />
        </>
      )}
    </div>
  );
};

export default Project;
