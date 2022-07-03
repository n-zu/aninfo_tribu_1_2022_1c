import type { NextPage } from "next";
import { ListRecursosBar } from "../../components/common/ListBar";
import RecursosTable from "../../components/rrhh/recursos/RecursosTable";
import { useRecursos } from "../../services/rrhh";


const Recursos: NextPage = () => {
    const recursosData = useRecursos();
  return (
    <div className="page">
        <h1>Lista de Recursos</h1>
        <ListRecursosBar
           label="recursos"
           options={recursosData?.recursos}
           />
        <RecursosTable {...recursosData}/>
    </div>
  );
};

export default Recursos;