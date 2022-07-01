
import Modal from "../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../common/Form/FormField";
import { Button, Typography } from "@mui/material";
import { saveProject } from "../../services/projects";
import { toast } from "react-toastify";
import { Project, Registro, RegistroDeHoras } from "../../services/types";
import { saveRegistro } from "../../services/rrhh";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  registro?: Registro;
};

const RegistroModal = ({ open, onClose, onSave, registro }: Props) => {
  const creating = registro == null;

  const initialValues = {
    nombre_proyecto: registro?.nombre_proyecto ?? "",
    nombre_tarea: registro?.nombre_tarea ?? "",
    nombre_recurso: registro?.nombre_recurso ?? "",
    id_proyecto: registro?.id_proyecto ?? 0,
    id_tarea: registro?.id_tarea ?? 0,
    id_recurso: registro?.id_recurso ?? 0,
    cantidad: registro?.cantidad ?? 0,
    fecha_trabajada: registro?.fecha_trabajada ?? "",
    };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.nombre_proyecto) errors.nombre_proyecto = "Requerido";
    if (!values.nombre_tarea) errors.nombre_tarea = "Requerido";
    if (!values.nombre_recurso) errors.nombre_recurso = "Requerido";
    if (!values.cantidad) errors.cantidad = "Requerido";
    if (!values.fecha_trabajada) errors.fecha_trabajada = "Requerido";
    if (!values.id_registro_horas) errors.id_registro_horas = "Requerido";
    return errors;
  };

  const onSubmit = async (values: any) => {
    try {
      console.log(values);
      await saveRegistro(values);
      toast.success("Proyecto guardado correctamente");
      onSave?.();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Error al guardar proyecto");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <FormField name="nombre_recurso" label="Nombre Recurso" />
              <FormField name="nombre_proyecto" label="Nombre Proyecto" />
              <FormField name="nombre_tarea" label="Nombre Tarea" />
              <FormField
                name="fecha_trabajada"
                type="date"
                label="Fecha "
              />
              <FormField name="cantidad" label="Horas Trabajadas" />
            </div>
            <br />
            <Button  startIcon={<SaveAltIcon/>} variant="contained" color="primary" type="submit">
              Guardar Registro
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RegistroModal;

/*import Modal from "../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../common/Form/FormField";
import { Autocomplete, Button, makeStyles, TextField, Typography } from "@mui/material";
import { saveProject, useProject, useProjects, useTask } from "../../services/projects";
import { toast } from "react-toastify";
import { Options, Project, RegistroDeHoras } from "../../services/types";
import AutoComplete from "../common/AutoComplete";
import { useState } from "react";
import React from "react";
import { zeroPad } from "../../util/util";
import BoxSelector from "./BoxSelector";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { saveRegistro, updateRegistro } from "../../services/rrhh";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  registro?: RegistroDeHoras;
};



export default function RecursoModal({open,  onClose, onSave,registro}: Props) {
  const creating = registro == null;
  const projectsData = useProjects();
  const [proyecto, setProyecto] = React.useState<Options | null>();
  const [tarea, setTarea] = React.useState<Options | null>();
  const [recurso, setRecurso] = React.useState<Options | null>();


  const initialValues = {
    nombre_proyecto: proyecto?.name?? "",
    nombre_tarea: tarea?.name ?? "",
    nombre_recurso: tarea?.name ?? "",
    id_proyecto: proyecto?.id ?? "",
    id_tarea: tarea?.id ?? "",
    id_recurso: recurso?.id ?? "",
    cantidad: registro?.cantidad ?? "",
    fecha_trabajada: registro?.fecha_trabajada ?? "",
    id_registro_horas: registro?.id_registro_horas ?? "",
    };
const validate = (values: any) => {
    const errors: any = {};
    if (!proyecto) errors.proyecto = "Requerido";
    if (!tarea) errors.tarea = "Requerido";
    if (!recurso) errors.recurso = "Requerido";
    return errors;
  };
  const onSubmit = async (values: any) => {
    try {
      await saveRegistro(values);
      toast.success("Registro de horas guardado correctamente");
      onSave?.();
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.error("Error al guardar registro de horas");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
       <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
          <BoxSelector
            options={projectsData.projects}
            setProyecto={setProyecto}
            setRecurso={setRecurso}
            setTarea={setTarea}
          />
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            >
            {({ isSubmitting }) => (
            <><Form>
                <FormField name="cantidad" label="Cantidad Horas" />
                <FormField
                  name="fecha_trabajada"
                  type="date"
                  label="Fecha de de trabajo" />
              
              <FormField
                  name="id_registro_horas"
                  type="number"
                  label="Id Registro de Horas" />
              <div style={{ alignItems:"center",display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
          
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ margin: "2rem", width: "100px" }}
                startIcon={<SaveAltIcon 
                type="submit"/>}
              >
                  Save
                </Button>
                </div>
              </Form>
              </>)}
            </Formik>
      </div>
    </Modal>
  );
};*/