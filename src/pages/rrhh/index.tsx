import { routeToRegistro } from "../../util/util";
import RegistrosList from "../../components/rrhh/RegistrosList";
import MenuHome from "../../components/rrhh/MenuHome";
import { ListRegistosBar } from "../../components/common/ListBar";
import { useRegistrosDeHoras } from "../../services/rrhh";
import React, { useState } from "react";
import RegistroModal from "../../components/rrhh/RegistroModal";
import { NextPage } from "next";

const Home: NextPage = () => {
  const registrosData = useRegistrosDeHoras();
  const [open, setOpen] = useState(false);

  return (
  <div>
    <div className="page">
      <MenuHome handleNew={() => setOpen(true)}/>
      { Array.isArray(registrosData.registrosDeHoras) ? <><ListRegistosBar
          label="registros"
          options={registrosData.registrosDeHoras}
          routeFunction={routeToRegistro} /><RegistrosList {...registrosData} /></> : 
          <div className="page" style={{textAlign:'center'}}>
            <h2>No hay registros de horas cargados</h2>
            <h3>Por favor  registre sus horas trabajadas</h3>
          </div> 
      }
      <RegistroModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={registrosData?.mutate}
      />
    </div>
  </div>
) 
}; 
export default Home;