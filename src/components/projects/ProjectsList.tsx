import Link from "next/link";
import { Project } from "../../services/types";
import { zeroPad } from "../../util/util";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import styles from "./Projects.module.css";
import InfoCard from "../common/Card"

// const ProjectCard = ({ project }: { project: Project }) => {
//   return (
//     <Link href={"/projects/project?id=" + project?.id}>
//       <a className={styles.ProjectCard}>
//         <Card style={{padding: 0}}>
//           <CardActionArea>
//             <CardContent>
//               <Typography variant="h6" component="h4" style={{fontWeight: 700}}>
//                 {zeroPad(project?.id ?? 0)} - {project.name}
//               </Typography>
//               <Typography variant="body1" style={{margin: 10}}>
//                 Inicio : {project.initial_date}
//               </Typography>
//               <Typography variant="body1" style={{margin: 10}}>
//                 Fin : {project.final_date}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </a>
//     </Link>
//   );
// };

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
