import type { NextPage } from "next";

import { useProjects } from "../../services/projects";
import ProjectsList from "../../components/projects/ProjectsList";
import { useState } from "react";
import NewProjectModal from "../../components/projects/NewProjectModal";
import ListBar from "../../components/common/ListBar";

const Projects: NextPage = () => {
  const projectsData = useProjects();

  const [open, setOpen] = useState(false);

  return (
    <div className="page">
      <ListBar handleNew={() => setOpen(true)} label="proyecto" />
      <ProjectsList {...projectsData} />
      <NewProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Projects;
