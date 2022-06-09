import type { NextPage } from "next";
import { Project } from "../../services/types";

import { useProjects, createProject } from "../../services/projects";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div>
      <h3>
        {project.id} {project.name}
      </h3>
      <p>Ini : {project.initial_date}</p>
      <p>Fin : {project.final_date}</p>
    </div>
  );
};

const Projects: NextPage = () => {
  const { projects, error, loading } = useProjects();

  const _proj: Project = {
    name: "My Project",
    initial_date: "2022-06-09T19:46:47.888Z",
    final_date: "2022-06-09T19:46:47.888Z",
    estimated_hours: 0,
  };

  return (
    <div className="page">
      <h1>Projects Page</h1>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {projects?.map((project: Project, i: number) => (
        <ProjectCard key={i} project={project} />
      ))}
      <button onClick={() => console.log(projects)}>SHOW</button>
      <button onClick={() => createProject(_proj)}>CREATE</button>
    </div>
  );
};

export default Projects;
