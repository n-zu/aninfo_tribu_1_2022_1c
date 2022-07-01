import Modal from "../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../common/Form/FormField";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { saveProject, useProject, useProjects, useTask } from "../../services/projects";
import { toast } from "react-toastify";
import { Options, Project } from "../../services/types";
import AutoComplete from "../common/AutoComplete";
import { useState } from "react";
import React from "react";
import { zeroPad } from "../../util/util";
import BoxSelector from "./BoxSelector";
import Task from "../../pages/projects/task";

type Props = {
  open: boolean;
  onClose: () => void;
};


export default function RecursoModal({open,  onClose}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <ProyectoBox/>
    </Modal>
  );
}

function ProyectoBox(){
  const projectsData = useProjects()
  return(
    <>
      <div style={{ display: "flex", justifyContent: "left", flexDirection: "column" }}>
        <h2>Seleccionar Proyecto</h2>
        <BoxSelector
          options={projectsData.projects}
          />
      </div>
    </>
  )
}

