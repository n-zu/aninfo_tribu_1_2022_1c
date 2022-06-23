import type { NextPage } from "next";
import { useProjects } from "../../services/projects";
import ProjectsList from "../../components/projects/ProjectsList";
import { useState } from "react";
import ProjectModal from "../../components/projects/ProjectModal";
import ListBar from "../../components/common/ListBar";
import { routeToProject } from "../../util/util";

const Projects: NextPage = () => {
  const projectsData = useProjects();
  const [open, setOpen] = useState(false);

  return (
    <div className="page">
      <ListBar
        handleNew={() => setOpen(true)}
        label="proyecto"
        options={projectsData.projects}
        routeFunction={routeToProject}
      />
      <ProjectsList {...projectsData} />
      <ProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={projectsData?.mutate}
      />
    </div>
  );
};

export default Projects;
