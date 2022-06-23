import { useRegistrosDeHoras } from "../../services/rrhh";
import { RegistroDeHoras } from "../../services/types";
import { useState } from "react";
import ListBar from "../../components/common/ListBar";
import type { NextPage } from "next";
import { ListBarRRHH } from "../../components/common/ListBar";
import LayoutHomeRRHH from "../../components/rrhh/LayoutHomeRRHH";
import { useProjects } from "../../services/projects";
import { routeToProject } from "../../util/util";
import { routeToRegistro } from "../../util/util";
import RegistroDeHorasList from "../../components/rrhh/RegistroDeHorasList";

const Home: NextPage = () => {
    const registrosData = useRegistrosDeHoras();
      const [open, setOpen] = useState(false)
      return (
          <div>
            <div className="page">
              <ListBar
                handleNew={() => setOpen(true)}
                label="registros"
                options={registrosData.registrosDeHoras}
                routeFunction={routeToRegistro}
              />
              <RegistroDeHorasList {...registrosData} />
            </div>
      </div>
  );
};

export default Home;

/*  const links = [
    { href: "/rrhh/registro_de_horas/proyecto/tarea/recurso", label: "recurso" },
    { href: "/rrhh/registro_de_horas/proyecto",label: "carga_horas" },
  ];
  const projectsData = useProjects();
  const [open, setOpen] = useState(false);
  return (
    <div className="page">
      <LayoutHomeRRHH/>
      <ListBarRRHH
        handleNew={() => setOpen(true)}
        label="proyecto"
        options={projectsData.projects}
        routeFunction={routeToProject}
      />
    </div>*/ 