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
  const projectsData = useProjects();
  return (
  <div>
    <div className="page">
      <MenuHome handleNew={() => setOpen(true)}/>
      <ListRegistosBar
          label="registros"
          options={registrosData.registrosDeHoras}
          routeFunction={routeToRegistro}/>
      <RegistrosList {...registrosData}/>
    </div>
  </div>
) 
}; 
export default Home;
/*
class errorBack extends React.Component{
  static state: any;
  static setState(unError: { error: unknown; }) {
    this.state = unError;
  }
}
*/
/*
const Home: NextPage = () => {
    const registrosData = useRegistrosDeHoras();
  
    try {
      registrosData.registrosDeHoras.detail;
    } catch (error) {
      errorBack.setState({ error });
    };

    if (errorBack.state.error) {
      return (
      <div className="page" style={{textAlign: 'center',width: '100%',height: '100%',alignItems:'center'}}> 
        <h1>No hay cargas de horas registradas</h1>
      </div>
      )
    }
    return (
    <div>
      <div className="page">
        <MenuHome/>
        <ListRegistosBar
            label="registros"
            options={registrosData.registrosDeHoras}
            routeFunction={routeToRegistro} /><RegistrosList {...registrosData} 
        />
      </div>
    </div>
  ) 
};
*/