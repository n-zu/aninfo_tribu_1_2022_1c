import type { NextPage } from "next";
import { useProjects } from "../../services/projects";
import ProjectsList from "../../components/projects/ProjectsList";
import { useState } from "react";
import NewProjectModal from "../../components/projects/NewProjectModal";
import ListBar from "../../components/common/ListBar";
import { routeToProject } from "../../util/util";

const Projects: NextPage = () => {
  const projectsData = useProjects();
  const [open, setOpen] = useState(false);
 // {console.log(projectsData.projects)}
  return (
    <div className="page">
      <ListBar
        handleNew={() => setOpen(true)}
        label="proyecto"
        options={projectsData.projects}
        routeFunction={routeToProject}
      />
      <ProjectsList {...projectsData} />
      <NewProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={projectsData?.mutate}
      />
    </div>
  );
};

export default Projects;
