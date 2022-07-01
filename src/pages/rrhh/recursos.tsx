import type { NextPage } from "next";
import ListBar, { ListRecursosBar } from "../../components/common/ListBar";
import RecursosList from "../../components/rrhh/RecursosList";
import RecursosTable from "../../components/rrhh/RecursosTable";
import { useRecursos } from "../../services/rrhh";
import { routeToRegistro } from "../../util/util";


const Recursos: NextPage = () => {
    const recursosData = useRecursos();
    console.log("RECURSOS PAGE");
    console.log(recursosData.recursos);
  return (
    <div className="page">
        <h1>Recursos</h1>
        <h2>Seleccione un recurso para cargar horas</h2>
        {/*<RecursosList {...recursosData}/>*/}
        <ListRecursosBar
           label="recursos"
           options={recursosData.recursos}
           />
        <RecursosTable {...recursosData}/>
    </div>
  );
};

export default Recursos;