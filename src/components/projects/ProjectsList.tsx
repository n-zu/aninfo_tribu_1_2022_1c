import { Project } from "../../services/types";
import styles from "./Projects.module.css";
import InfoCard from "../common/Card"

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
        <InfoCard key={i} info={project} link="/projects/project?id="/>
      ))}
    </div>
  );
};

export default ProjectsList;
