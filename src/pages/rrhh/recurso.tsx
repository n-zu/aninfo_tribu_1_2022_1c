import type { NextPage } from "next";
import { useRecursos } from "../../services/rrhh";

const Recurso: NextPage = () => {
    const recursos = useRecursos();
  return (
    <div className="page">
        hola
    </div>
  );
};

export default Recurso;