import type { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../../components/common/Loading";
import ModificacionHoras from "../../components/rrhh/ModificacionHoras";
import { CargaHoras } from "../../components/rrhh/Prueba";
import { useRegistro } from "../../services/rrhh";


const ModificarRegistro: NextPage = () => {
  const router = useRouter();
  const registroId = router?.query?.id as string;
  const { registro, error, loading } = useRegistro(registroId);
  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      { registro && <ModificacionHoras registro={registro}/> }
      {/* { registro && <CargaHoras registro={registro}/> }  */}
    </div>
    );
};

export default ModificarRegistro;