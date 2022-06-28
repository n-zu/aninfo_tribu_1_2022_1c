import type { NextPage } from "next";
import RecursosList from "../../components/rrhh/RecursosList";
import { useRecursos } from "../../services/rrhh";


const Recursos: NextPage = () => {
    const recursosData = useRecursos();
    console.log("RECURSOS PAGE");
    console.log(recursosData.recursos);
  return (
    <div className="page">
        <h1>Recursos</h1>
        <h2>Seleccione un recurso para cargar horas</h2>
        <RecursosList {...recursosData}/>
    </div>
  );
};

export default Recursos;