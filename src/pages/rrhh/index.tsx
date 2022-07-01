import { NextPage } from "next";
import { routeToRegistro } from "../../util/util";
import RegistrosList from "../../components/rrhh/RegistrosList";
import MenuHome from "../../components/rrhh/MenuHome";
import { ListRegistosBar } from "../../components/common/ListBar";
import { useRegistrosDeHoras } from "../../services/rrhh";
import React, { useState } from "react";
import RegistroModal from "../../components/rrhh/RegistroModal";
import { useProjects } from "../../services/projects";

const Home: NextPage = () => {
  const registrosData = useRegistrosDeHoras();
  const [open, setOpen] = useState(false);
  return (
  <div>
    <div className="page">
      <MenuHome handleNew={() => setOpen(true)}/>
      <ListRegistosBar
          label="registros"
          options={registrosData.registrosDeHoras}
          routeFunction={routeToRegistro}/>
      <RegistrosList {...registrosData}/>
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