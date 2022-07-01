import React from 'react'
import { useState } from 'react'
import { useProject, useProjects, useTask } from '../../services/projects'
import { updateRegistro, useRecurso } from '../../services/rrhh'
import { Options, Project, Recurso, Registro, Task } from '../../services/types'
import { Autocomplete, Button, TextField } from '@mui/material'
import { zeroPad } from '../../util/util';
import { Form, Formik } from 'formik'
import FormField from '../common/Form/FormField'
import { toast } from 'react-toastify'
import { useRouter } from "next/router";

const ModificacionHoras = (props: {registro: Registro}) => {

    const {project} = useProject(props.registro.id_proyecto)
    const {task} = useTask(props.registro.id_tarea)
    const {recurso} = useRecurso(props.registro.id_recurso)
    const {projects} = useProjects()

    const router = useRouter();
    const registroId = router?.query?.id as string;

    const initialValues = {
        fecha: props.registro.fecha_trabajada,
        cantidad_horas: props.registro.cantidad,
    };
    
    const validate = (values: any) => {
    const errors: any = {};
    if (!values.fecha) errors.fecha = "Requerido";
    return errors;
    };

    const onSubmit = async (values: any) => {
    try {
        // console.log(props.registro)
        // console.log(values)
        await updateRegistro(values, registroId);
        toast.success("Proyecto guardado correctamente");
    } catch (e) {
        console.error(e);
        toast.error("Error al guardar proyecto");
    }
    };

    return (
        <div className='page'>
            <h1>Modificación de horas</h1> 
            <BoxSelector 
                label={"Proyecto"} 
                options={projects}
                defaultProject={project}
                defaultTask={task}
                defaultRecurso={recurso}
            />

        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            >
            {({ isSubmitting }) => (
            <Form>
                <div>           
                    <h3>Seleccionar fecha</h3>
                    <FormField
                    name="fecha"
                    type="date"
                    label="Fecha trabajada"
                    />

                    <h3>Seleccionar cantidad horas</h3>
                    <FormField
                    name="cantidad_horas"
                    type="int"
                    label="Cantidad horas"
                    />
                </div>
            <br />
            </Form>
            )}
            </Formik>

            <br /><br />
            <div style={{display:"flex", justifyContent: "space-around"}}>
                {/* <Button style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"red"}} type="submit" variant="outlined">Eliminar</Button> */}
                <Button style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"green"}} type="submit" variant="contained">Actualizar</Button>
            </div>
        </div>
    )
}

function BoxSelector(
    props:{
        options:Project[],
        label?:string, 
        defaultProject?: Project,
        defaultTask?: Task,
        defaultRecurso?: Recurso,
    }) {
    
    const [projectValue, setProjetc] = useState<Options | null>();
    const [inputProject, setInputProject] = useState('');
    const [tasksValue,setTasks] = useState<Options | null>();
    const [inputTask, setInputTask] = useState('');
    const [recursoValue,setRecurso] = useState<Recurso | null>();
    const [inputRecurso, setInputRecurso] = useState('');

    const { project } = useProject((projectValue?.id ?? null) as unknown as string);
    const { task } = useTask((tasksValue?.id ?? null) as unknown as string);

    return (
        <>
        <div>
            <div>
                <h3>Seleccionar Proyecto</h3>
                <Box options = {props.options} 
                label={"Proyectos"}
                // defaultValue={props.defaultProject ?? null}
                setValue= {setProjetc}
                setInputValue= {setInputProject}
                value={projectValue ?? null}
                inputValue={inputProject}
                disabled={false}/>
            </div>

            <div>
                <h3>Seleccionar Tarea</h3>
                <Box options={project?.tasks ?? []} 
                label={"Tareas"}
                setValue= {setTasks}
                // defaultValue={props.defaultTask ?? null}
                setInputValue= {setInputTask}
                value={tasksValue ?? null}
                inputValue={inputTask }
                disabled={true}/>
            </div>

            <div>
                <h3>Seleccionar recurso</h3>
                <RecursoBox options={task?.collaborators as Recurso[] ?? []} 
                label={"Recursos"}
                setValue= {setRecurso}
                // defaultValue={props.defaultRecurso ?? null}
                setInputValue= {setInputRecurso}
                value={recursoValue ?? null}
                inputValue={inputRecurso}
                disabled={true}
                />
            </div>
        </div>
        </>
      );
};

function Box(props: {
    options:Options[], 
    label:string,
    setValue: Function,
    defaultValue?: Options | null,
    setInputValue:Function,
    value:Options | null,
    inputValue:string,
    disabled:boolean,
    }){
    return (
    <>
        <Autocomplete
            id="controllable-states-demo"
            value={props.value ?? undefined}
            defaultValue={props.defaultValue ?? undefined}
            disabled = {(props.options?.length === 0 && props.disabled)? true: false}
            options={props.options}
            onChange={(event: any, newOption: Options | null | undefined) => {
                props.setValue(newOption);
            } }
            inputValue={props.inputValue}
            onInputChange={(event, newInputValue) => {
                props.setInputValue(newInputValue);
            } }
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={props.defaultValue?.name}/>}
            getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
    </>);
}

function RecursoBox (props: {
    options:Recurso[], 
    label:string,
    setValue: Function,
    defaultValue?: Recurso | null,
    setInputValue:Function,
    value:Recurso | null,
    inputValue:string,
    disabled:boolean,
    }){
   const {recurso} = useRecurso(props.value as unknown as string);
   props.setValue(recurso);
    return (
    <>
        <Autocomplete
            id="controllable-states-demo"
            value={props.value ?? undefined}
            disabled = {(props.options?.length === 0 && props.disabled)? true: false}
            options={props.options}
            onChange={(event: any, newOption: Recurso | null | undefined) => {
                props.setValue(newOption);
            } }
            inputValue={props.inputValue}
            onInputChange={(event, newInputValue) => {
                props.setInputValue(newInputValue);
            } }
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label={props.label}/>}
            getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + (option?.name??'') +" - " + option?.lastname??''} />
    </>);
}

export default ModificacionHoras
