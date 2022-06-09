import type { NextPage } from "next";
import { Project } from "../../services/types";

import { useProjects, useCreateProject } from "../../services/projects";

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
  const createProject = useCreateProject();

  return (
    <div className="page">
      <h1>Projects Page</h1>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {projects?.map((project: Project, i: number) => (
        <ProjectCard key={i} project={project} />
      ))}
      <button onClick={() => console.log(projects)}>SHOW</button>
      <button onClick={() => createProject("FDELU")}>CREATE</button>
    </div>
  );
};

export default Projects;
