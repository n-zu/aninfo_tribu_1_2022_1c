import { Recurso } from "../../services/types";
import styles from "../projects/Projects.module.css";
import RecursoCard from "./RecursoCard";

type RecursosListProps = {
  recursos: Recurso[];
  error: any;
  loading: boolean;
};

const RecursosList = ({ recursos, error, loading }: RecursosListProps) => {
  return (
    <div className={styles.ProjectsList + " flexContainer"}>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {recursos?.map((recurso: Recurso, i: number) => (
        <RecursoCard key={i} info={recurso} link="/rrhh/recurso?id=" />
      ))}
    </div>
  );
};

export default RecursosList;
