import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../../components/common/Loading";
import ModificacionHoras from "../../components/rrhh/ModificacionHoras";
import { useRecursos, useRegistro, useRegistrosDeHoras } from "../../services/rrhh";


const ModificarRegistro: NextPage = () => {
  const router = useRouter();
  const registroId = router?.query?.id as string;
  const { registro, error, loading } = useRegistro(registroId);
  console.log(registro);
  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      { registro && <ModificacionHoras registro={registro}/> }
       </div>
    );
};

export default ModificarRegistro;