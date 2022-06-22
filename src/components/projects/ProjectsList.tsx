import { Project } from "../../services/types";
import styles from "./Projects.module.css";
import InfoCard from "../common/Card";
import Loading from "../common/Loading";
import { Typography, Box } from "@material-ui/core";
import Caption from "../common/Caption";
import { pluralize } from "../../util/util";

type ProjectsListProps = {
  projects: Project[];
  error: any;
  loading: boolean;
};

const ProjectsList = ({ projects, error, loading }: ProjectsListProps) => {
  return (
    <div className={styles.ProjectsList + " flexContainer"}>
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      {projects?.map((project: Project, i: number) => (
        <InfoCard key={i} info={project} link="/projects/project?id=">
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <Typography variant="caption">
              {pluralize("tarea", project.tasks?.length)}
            </Typography>
            <Typography variant="caption">? colaboradores</Typography>
          </Box>
        </InfoCard>
      ))}
      <Caption>{projects?.length ? "" : "No hay proyectos"}</Caption>
    </div>
  );
};

export default ProjectsList;
