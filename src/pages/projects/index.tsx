import type { NextPage } from "next";
import { Project } from "../../services/types";
import { Box, Button, Modal, Typography } from "@material-ui/core";

import { useProjects, createProject } from "../../services/projects";
import ProjectsList from "../../components/projects/ProjectsList";
import { useState } from "react";
import NewProjectModal from "../../components/projects/NewProjectModal";

const _proj: Project = {
  name: "My Project",
  initial_date: "2022-06-09T19:46:47.888Z",
  final_date: "2022-06-09T19:46:47.888Z",
  estimated_hours: 0,
};

type BarProps = {
  handleNew: () => void;
};

const Bar = ({ handleNew }: BarProps) => (
  <div
    style={{
      display: "flex",
      gap: 10,
      margin: "10px 0 20px",
    }}
  >
    <input
      type="text"
      style={{ width: "100%", height: "2em" }}
      placeholder="Buscar por nombre"
    />
    <Button
      style={{
        whiteSpace: "nowrap",
      }}
      variant="contained"
      color="primary"
      onClick={handleNew}
    >
      Nuevo Proyecto
    </Button>
  </div>
);

const Projects: NextPage = () => {
  const projectsData = useProjects();

  const [open, setOpen] = useState(false);

  return (
    <div className="page">
      <Bar handleNew={() => setOpen(true)} />
      <ProjectsList {...projectsData} />
      <NewProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Projects;
