import Link from "next/link";
import { Project } from "../../services/types";
import Card from "../common/Card";
import styles from "./Projects.module.css";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={"/projects/project?id=" + project?.id}>
      <a className={styles.ProjectCard}>
        <Card hover={true}>
          <h3>
            {project.id} {project.name}
          </h3>
          <p>Inicio : {project.initial_date}</p>
          <p>Fin : {project.final_date}</p>
        </Card>
      </a>
    </Link>
  );
};

type ProjectsListProps = {
  projects: Project[];
  error: any;
  loading: boolean;
};

const ProjectsList = ({ projects, error, loading }: ProjectsListProps) => {
  return (
    <div className={styles.ProjectsList + " flexContainer"}>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {projects?.map((project: Project, i: number) => (
        <ProjectCard key={i} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
