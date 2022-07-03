import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Autocomplete, Button , TextField} from "@mui/material";
import { useProject, useProjects, useTask } from '../../services/projects';
import { Options, Project, Recurso, Registro, Task } from '../../services/types';
import { zeroPad } from '../../util/util';
import { removeRegistro, saveRegistro, updateRegistro, useRecurso } from '../../services/rrhh';
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

export default function RegistroForm(props:{defaultRegistro : Registro, registroId: string}){

    // const defaultProject : Options = useProject(props.defaultRegistro.id_proyecto).project as Options
    // const defaultTask : Options = useTask(props.defaultRegistro.id_tarea).task as Options
    // const defaultRecurso : Options = useRecurso(props.defaultRegistro.id_recurso).recurso as Options
    const defaultProject = useProject(props.defaultRegistro.id_proyecto).project
    const defaultTask = useTask(props.defaultRegistro.id_tarea).task
    const defaultRecurso = useRecurso(props.defaultRegistro.id_recurso).recurso
    
    const [projectValue, setProject] = useState<Options | null>(defaultProject);
    const [tasksValue,setTasks] = useState<Options | null>(defaultTask);
    const [recursoValue,setRecurso] = useState<Options | null>(defaultRecurso);

    const {projects} = useProjects();
    const { project } = useProject((projectValue?.id ?? null) as unknown as string);
    const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
    const date = '2020-01-01' as unknown as Date;

    const formik = useFormik({
        initialValues: {
            nombre_proyecto: projectValue?.name,
            nombre_tarea: tasksValue?.name,
            nombre_recurso: recursoValue?.name,
            id_proyecto: projectValue?.id,
            id_tarea: tasksValue?.id,
            id_recurso: recursoValue?.id,
            cantidad: " ",
            fecha_trabajada: date,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            updateRegistro(values as unknown as Registro, props.registroId)
        },
    });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div 
        style={{display:"flex", flexDirection:"column", gap:"20px"}}
        >
            <div>
            <Autocomplete
            sx={{ width: "100%"}}
            onChange={(event: any, newOption: Options | null) => {
                setProject(newOption);
                formik.values.nombre_proyecto = newOption?.name;
                formik.values.id_proyecto = newOption?.id;
            }}
            defaultValue={defaultProject}
            renderInput={(params) => <TextField {...params} label={"Proyectos"}/>}
            options={projects} 
            getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
            </div>

            <div>
            <Autocomplete
            sx={{ width: "100%"}}
            defaultValue={defaultTask}
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
            defaultValue={defaultRecurso}
            options={task?.collaborators as Recurso[] ?? []}
            onChange={(event: any, newOption: Recurso | null) => {
                setRecurso(newOption);
                formik.values.id_recurso = newOption?.id;
                formik.values.nombre_recurso = newOption?.name;
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
                defaultValue={props.defaultRegistro.cantidad}
                onChange={formik.handleChange}
                error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                helperText={formik.touched.cantidad && formik.errors.cantidad}
            />
            </div>
            
            <div>
            <TextField
                id="fecha_trabajada"
                type="date"
                defaultValue={props.defaultRegistro.fecha_trabajada}
                value={formik.values.fecha_trabajada}
                onChange={formik.handleChange}
                error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                helperText={formik.touched.cantidad && formik.errors.cantidad}
                sx={{ width: "100%"}}
            />
            </div>
            
            <div style={{display:"flex", justifyContent: "space-around"}}>
                <Button 
                style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"red"}} 
                variant="outlined"
                onClick={() => {
                    removeRegistro(props.registroId)
                }}>
                Eliminar
                </Button>
                <Button 
                style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"green"}} 
                type="submit" 
                variant="contained">
                Actualizar
                </Button>
            </div>
        </div>
      </form>
    </div>
  );
};
