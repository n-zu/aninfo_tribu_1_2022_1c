import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Autocomplete, Button , TextField} from "@mui/material";
import { useProject, useProjects, useTask } from '../../services/projects';
import { Options, Recurso, Registro } from '../../services/types';
import { zeroPad } from '../../util/util';
import styles from "./Formulario.module.css";
import { saveRegistro } from '../../services/rrhh';
import { useState } from 'react'

const validationSchema = yup.object({
    nombre_proyecto: yup
    .string()
    .required('Requerido'),
    nombre_tarea: yup
    .string()
    .required('Requerido'),
    nombre_recurso: yup
    .string()
    .required('Requerido'),
    cantidad: yup
    .string()
    .required('Requerido'),
    fecha_trabajada: yup
    .string()
    .required('Requerido'),
});

export default function RegistroForm(){

    const {projects} = useProjects();
    const [projectValue, setProjetc] = useState<Options | null>();
    const [tasksValue,setTasks] = useState<Options | null>();
    const [recursoValue,setRecurso] = useState<Recurso | null>();
    const { project } = useProject((projectValue?.id ?? null) as unknown as string);
    const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
    const date = '2020-01-01' as unknown as Date;

    const formik = useFormik({
        initialValues: {
            nombre_proyecto: projectValue?.name,
            nombre_tarea: tasksValue?.name,
            nombre_recurso: " ",
            id_proyecto: projectValue?.id,
            id_tarea: tasksValue?.id,
            id_recurso: recursoValue?.id,
            cantidad: " ",
            fecha_trabajada: date,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values);
          saveRegistro(values as unknown as Registro)
        },
    });
  
  console.log("FORMIK"+formik.values);

  return (
    <div>
      <form className={styles.formulario} onSubmit={formik.handleSubmit} >
        <h3>Nuevo Registro de horas</h3>
        
        <div>
          <Autocomplete
          sx={{ width: "100%"}}
          onChange={(event: any, newOption: Options | null) => {
              setProjetc(newOption);
              formik.values.nombre_proyecto = newOption?.name;
              formik.values.id_proyecto = newOption?.id;
          }}
          renderInput={(params) => <TextField {...params} label={"Proyectos"}/>}
          options={projects} 
          getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
        </div>

        <div>
          <Autocomplete
          sx={{ width: "100%"}}
          options={project?.tasks ?? []}
          onChange={(event: any, newOption: Options | null) => {
              setTasks(newOption);
              formik.values.id_tarea = newOption?.id;
              formik.values.nombre_tarea = newOption?.name;
          } }
          renderInput={(params) => <TextField {...params} label={"Tareas"}/>}
          getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
        </div>  

        <div>
          <Autocomplete
          options={task?.collaborators as Recurso[] ?? []}
          onChange={(event: any, newOption: Recurso | null) => {
              setRecurso(newOption);
              formik.values.id_recurso = newOption?.id;
              // formik.values.nombre_recurso = newOption?.name;
          } }
          sx={{ width: "100%"}}
          renderInput={(params) => <TextField {...params} label={"Recursos"}/>}
          getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
        </div>

        <div>
          <TextField
            fullWidth
            id="cantidad"
            type='number'
            name="cantidad"
            label="Cantidad"
            value={formik.values.cantidad}
            onChange={formik.handleChange}
            error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
            helperText={formik.touched.cantidad && formik.errors.cantidad}
          />
        </div>
        
        <div>
          <TextField
            id="fecha_trabajada"
            type="date"
            defaultValue={date}
            value={formik.values.fecha_trabajada}
            onChange={formik.handleChange}
            error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
            helperText={formik.touched.cantidad && formik.errors.cantidad}
            sx={{ width: "100%"}}
          />
        </div>
       
        <Button 
          variant="contained"
          color="primary"
          size="medium"
          type="submit">
          Cargar
        </Button>
      </form>
    </div>
  );
};
