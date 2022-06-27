import type { NextPage } from "next";
import { useRecursos } from "../../services/rrhh";

const RegistroHoras: NextPage = () => {
    const recursos = useRecursos();
  return (
    <div className="page">
        hola
    </div>
  );
};

export default RegistroHoras;