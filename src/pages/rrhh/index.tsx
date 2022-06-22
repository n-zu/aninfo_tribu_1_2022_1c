import type { NextPage } from "next";
import ListBar from "../../components/common/ListBar";
import LayoutHomeRRHH from "../../components/rrhh/LayoutHomeRRHH";
import { useState } from "react";
import { useProjects } from "../../services/projects";
import ProjectsList from "../../components/projects/ProjectsList";
import { routeToProject } from "../../util/util";


const Home: NextPage = () => {
  const links = [
    { href: "/rrhh/registro_de_horas/proyecto/tarea/recurso", label: "recurso" },
    { href: "/rrhh/registro_de_horas/proyecto",label: "carga_horas" },
  ];
  const projectsData = useProjects();
  const [open, setOpen] = useState(false);
  return (
    <div className="page">
      <LayoutHomeRRHH/>
      <ListBar
        handleNew={() => setOpen(true)}
        label="proyecto"
        options={projectsData.projects}
        routeFunction={routeToProject}
      />
    </div>
  );
};

export default Home;
