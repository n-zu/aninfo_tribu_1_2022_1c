import { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../../components/common/Loading";
import ModificacionHoras from "../../components/rrhh/ModificacionHoras";
import { useRegistro } from "../../services/rrhh";

const ModificarRegistro: NextPage = () => {
  const router = useRouter();
  const registroId = router?.query?.id as string;
  const { registro, error, loading } = useRegistro(registroId);

  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      <h1>Modificar registro - {registroId}</h1>
      {registro && (
        <ModificacionHoras defaultRegistro={registro} registroId={registroId} />
      )}
    </div>
  );
};

export default ModificarRegistro;
