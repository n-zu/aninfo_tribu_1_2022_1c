import type { NextPage } from "next";
import { Project } from "../../services/types";

import { useProjects, createProject } from "../../services/projects";
import ProjectsList from "../../components/projects/ProjectsList";

const _proj: Project = {
  name: "My Project",
  initial_date: "2022-06-09T19:46:47.888Z",
  final_date: "2022-06-09T19:46:47.888Z",
  estimated_hours: 0,
};

const newProject = () => {
  const name = prompt("Nombre del Proyecto", "Nuevo Proyecto");
  createProject({ ..._proj, name: name ?? "Nuevo Proyecto" });
};

const Bar = () => (
  <div
    style={{
      display: "flex",
      gap: 10,
      margin: "10px 0 20px",
    }}
  >
    <input
      type="text"
      style={{ width: "100%", height: "2em" }}
      placeholder="Buscar por nombre"
    />
    <button
      style={{
        whiteSpace: "nowrap",
      }}
      onClick={newProject}
    >
      Nuevo Proyecto
    </button>
  </div>
);

const Projects: NextPage = () => {
  const projectsData = useProjects();

  return (
    <div className="page">
      <Bar />
      <ProjectsList {...projectsData} />
    </div>
  );
};

export default Projects;
