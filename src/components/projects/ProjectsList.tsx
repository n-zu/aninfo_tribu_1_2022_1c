import { Project, Task, EmployeeId } from "../../services/types";
import styles from "./Projects.module.css";
import InfoCard from "../common/Card";
import Loading from "../common/Loading";
import { Typography, Box } from "@material-ui/core";
import Caption from "../common/Caption";
import { pluralize } from "../../util/util";
import Alert from "@mui/material/Alert";

type ProjectsListProps = {
  projects: Project[];
  error: any;
  loading: boolean;
};

const ProjectsList = ({ projects, error, loading }: ProjectsListProps) => {
  return (
    <>
      {loading && !error ? <Loading /> : ""}
      {error ? (
        <Alert severity="error" style={{ width: "100%" }}>
          No se pudieron cargar los proyectos
        </Alert>
      ) : null}
      <div className={styles.ProjectsList + " flexContainer"}>
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
                {pluralize("tarea", project.tasks_amount)}
              </Typography>
              <Typography variant="caption">
                {pluralize("colaborador", project.collaborators_amount, "es")}
              </Typography>
            </Box>
          </InfoCard>
        ))}
        <Caption>{projects?.length === 0 ? "No hay proyectos" : ""}</Caption>
      </div>
    </>
  );
};

export default ProjectsList;
