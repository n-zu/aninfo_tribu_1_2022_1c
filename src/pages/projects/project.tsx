import type { NextPage } from "next";
import { Box, Typography, Button } from "@material-ui/core";

import { useProject } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import ListBar from "../../components/common/ListBar";
import { useState } from "react";
import NewTaskModal from "../../components/projects/tasks/NewTaskModal";
import TasksList from "../../components/projects/tasks/TasksList";
import { Task } from "../../services/types";
import Loading from "../../components/common/Loading";
import ProjectModal from "../../components/projects/ProjectModal";

type TasksProps = {
  projectId: string;
  tasks: Task[];
  onCreate: () => void;
};
const Tasks = ({ projectId, tasks, onCreate }: TasksProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListBar
        handleNew={() => setOpen(true)}
        label="tarea"
        options={tasks}
        routeFunction={function () {}}
      />
      <TasksList tasks={tasks} />
      <NewTaskModal
        open={open}
        onClose={() => setOpen(false)}
        projectId={projectId}
        onCreate={onCreate}
      />
    </>
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const projectId = router?.query?.id as string;
  const { project, error, loading, mutate } = useProject(projectId);
  const [open, setOpen] = useState(false);

  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      {project && (
        <>
          <Box
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" style={{ alignSelf: "center" }}>
              {zeroPad(project?.id ?? 0)} - {project?.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ height: "fit-content" }}
              onClick={() => setOpen(true)}
            >
              Editar Proyecto
            </Button>
          </Box>
          <Typography variant="body1">
            Fecha de inicio: {project?.initial_date}
          </Typography>
          <Typography variant="body1">
            Fecha de fin: {project?.final_date}
          </Typography>
          <Typography variant="body1">
            Horas estimadas: {project?.estimated_hours}
          </Typography>
          <Tasks
            projectId={projectId}
            tasks={project?.tasks ?? []}
            onCreate={mutate}
          />
          <ProjectModal
            open={open}
            onClose={() => setOpen(false)}
            project={project}
            onSave={mutate}
          />
        </>
      )}
    </div>
  );
};

export default Project;
