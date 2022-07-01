import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../../components/common/Loading";
import ModificacionHoras from "../../components/rrhh/ModificacionHoras";
import { useRecursos, useRegistro, useRegistrosDeHoras } from "../../services/rrhh";


const RegistroHoras: NextPage = () => {
  const router = useRouter();
  const registroId = router?.query?.id as string;
  const { registro, error, loading } = useRegistro(registroId);
  console.log(registro);
  return (
    <div className="page">
      {loading ? <Loading /> : ""}
      {error ? "ERROR" : ""}
      {/* {registro && 
        <div className="page">
          <Typography 
            variant="h6"
            component="h6"
            style={{ fontWeight: 700, textOverflow: "ellipsis" }}
            noWrap >
            {"Proyecto: " + registro.nombre_proyecto}
          </Typography>
          <Typography 
            variant="h6"
            component="h6"
            style={{ fontWeight: 700, textOverflow: "ellipsis" }}
            noWrap >
              {"Tarea: " + registro.nombre_tarea}
          </Typography>
          <Typography           
            variant="h6"
            component="h6"
            style={{ fontWeight: 700, textOverflow: "ellipsis" }}
            noWrap >
            {"Recurso: " + registro.nombre_recurso}
          </Typography>  
          <Typography           
            variant="h6"
            component="h6"
            style={{ fontWeight: 700, textOverflow: "ellipsis" }}
            noWrap >
            {""}
          </Typography>    
        </div>
      }  */}
        {
          registro && <ModificacionHoras registro={registro}/>
        }
       </div>
    );
};

export default RegistroHoras;