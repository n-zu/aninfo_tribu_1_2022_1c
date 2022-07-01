import { Autocomplete, Button, TextField } from '@mui/material'
import React from 'react'
import { useProject, useTask } from '../../services/projects';
import { useRecurso } from '../../services/rrhh';
import { Options, Project, Recurso, Task } from '../../services/types'
import { zeroPad } from '../../util/util';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Formik } from 'formik';


export default function BoxSelector(
    props:{
        options:Project[],
        label?:string, 
        defaultProject?: Project,
        defaultTask?: Task,
        defaultRecurso?: Recurso
        page?:boolean;   
        setProyecto:Function;
        setTarea: Function ;
        setRecurso: Function ;     
    }) {
    
    const [projectValue, setProjetc] = React.useState<Options | null>();
    const [inputProject, setInputProject] = React.useState('');
    const [tasksValue,setTasks] = React.useState<Options | null>();
    const [inputTask, setInputTask] = React.useState('');
    const [recursoValue,setRecurso] = React.useState<Recurso | null>();
    const [inputRecurso, setInputRecurso] = React.useState('');

    const { project } = useProject((projectValue?.id ?? null) as unknown as string);
    const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
    
    props.setProyecto(projectValue ?? null);
    props.setTarea(tasksValue);
    props.setRecurso(recursoValue);

    return (
        <>
        <h3>Seleccionar Proyecto</h3>
        <Box options = {props.options} 
        label={"Proyectos"}
        defaultValue={props.defaultProject ?? null}
        setValue= {setProjetc}
        setInputValue= {setInputProject}
        value={projectValue ?? null}
        inputValue={inputProject }
        disabled={false}
        page= {props.page ?? false}/>

        <h3>Seleccionar Tarea</h3>
        <Box options={project?.tasks ?? []} 
        label={"Tareas"}
        setValue= {setTasks}
        defaultValue={props.defaultTask ?? null}
        setInputValue= {setInputTask}
        value={tasksValue ?? null}
        inputValue={inputTask }
        disabled={true}
        page= {props.page ?? false}/>

        <h3>Seleccionar Recurso</h3>
        <RecursoBox options={task?.collaborators as Recurso[] ?? []} 
        label={"Recursos"}
        setValue= {setRecurso}
        defaultValue={props.defaultRecurso ?? null}
        setInputValue= {setInputRecurso}
        value={recursoValue ?? null}
        inputValue={inputRecurso }
        disabled={true}
        page= {props.page ?? false}
        />
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
    page: boolean
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
            sx={{ width: "100%"}}
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
    page: boolean
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
            sx={{ width: "100%"}}
            renderInput={(params) => <TextField {...params} label={props.label}/>}
            getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + (option?.name??'') +" - " + option?.lastname??''} 
            />
    </>);
}

