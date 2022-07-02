import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Autocomplete, Button , TextField} from "@mui/material";
import { useProject, useProjects, useTask } from '../../services/projects';
import { Options, Recurso, Registro } from '../../services/types';
import { zeroPad } from '../../util/util';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import styles from "../../components/rrhh/Formulario.module.css";
import { saveRegistro } from '../../services/rrhh';


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

    const [projectValue, setProjetc] = React.useState<Options | null>();
    const [inputProject, setInputProject] = React.useState('');
    const [tasksValue,setTasks] = React.useState<Options | null>();
    const [inputTask, setInputTask] = React.useState('');
    const [recursoValue,setRecurso] = React.useState<Recurso | null>();
    const [inputRecurso, setInputRecurso] = React.useState('');

    const [fechaValue, setFechaValue] = React.useState<Date | null>();

    const { project } = useProject((projectValue?.id ?? null) as unknown as string);
    const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
   // const {recurso} = useRecurso(recursoValue?.id as unknown as string);
   const date = '1900-01-01' as unknown as Date;

    const formik = useFormik({
        initialValues: {
            nombre_proyecto: " ",
            nombre_tarea: " ",
            nombre_recurso: " ",
            id_proyecto: projectValue?.id,
            id_tarea: tasksValue?.id,
            id_recurso: recursoValue?.id,
            cantidad: 0,
            fecha_trabajada: date,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          saveRegistro(values as unknown as Registro)
        },
    });
  
  console.log(formik.values);

  return (
    <div>
      <form className={styles.formulario} onSubmit={formik.handleSubmit} >
        <Autocomplete
        id="controllable-states-demo"
        value={projectValue }
        options={projects}
        onChange={(event: any, newOption: Options | null) => {
            setProjetc(newOption);
            formik.values.id_proyecto = newOption?.id;
        } }
        inputValue={inputProject}
        onInputChange={(event, newInputValue) => {
            setInputProject(newInputValue);
            formik.values.nombre_proyecto = newInputValue;  
        } }
        sx={{ width: "100%"}}
        renderInput={(params) => <TextField {...params} label={"Buscar Tarea"}/>}
        getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />

         <Autocomplete
        id="controllable-states-demo"
        value={tasksValue }
        disabled = {(project?.tasks?.length === 0 && false)? true: false}
        options={project?.tasks ?? []}
        onChange={(event: any, newOption: Options | null) => {
            setTasks(newOption);
            formik.values.id_tarea = newOption?.id;
        } }
        inputValue={inputTask}
        onInputChange={(event, newInputValue) => {
            setInputTask(newInputValue);
            formik.values.nombre_tarea = newInputValue;
            
        } }
        sx={{ width: "100%"}}
        renderInput={(params) => <TextField {...params} label={"Buscar Tarea"}/>}
        getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />

         <Autocomplete
        id="controllable-states-demo"
        value={recursoValue}
        disabled = {(task?.collaborators?.length === 0 && false)? true: false}
        options={task?.collaborators as Recurso[] ?? []}
        onChange={(event: any, newOption: Recurso | null) => {
            setRecurso(newOption);
            formik.values.id_recurso = newOption?.id;
        } }
        inputValue={inputRecurso}
        onInputChange={(event, newInputValue) => {
          formik.values.nombre_recurso = newInputValue;
          setInputRecurso(newInputValue);
        } }
        sx={{ width: "100%"}}
        renderInput={(params) => <TextField {...params} label={"Buscar"}/>}
        getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
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
        <div style={{display: 'flex',justifyContent: 'space-around',flexDirection: 'row'}}>
        <TextField
          id="fecha_trabajada"
          type="date"
          value={formik.values.fecha_trabajada}
          onChange={formik.handleChange}
          error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
          helperText={formik.touched.cantidad && formik.errors.cantidad}
        />
       
        <Button 
          variant="contained"
          color="primary"
          size="medium"
          sx={{ margin: "2rem", width: "100px" }}
          startIcon= {<SaveAltIcon />} 
          type="submit">
          Save
        </Button>
        </div>
      </form>
    </div>
  );
};
