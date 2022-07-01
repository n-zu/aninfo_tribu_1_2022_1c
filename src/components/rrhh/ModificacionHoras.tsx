import React from 'react'
import { useProject, useProjects, useTask } from '../../services/projects'
import { useRecurso } from '../../services/rrhh'
import { Registro } from '../../services/types'
import BoxSelector from './BoxSelector'

const ModificacionHoras = (props: {registro: Registro}) => {
  
    const {project} = useProject(props.registro.id_proyecto)
    const {task} = useTask(props.registro.id_tarea)
    const {recurso} = useRecurso(props.registro.id_recurso)
    const {projects} = useProjects()
    console.log(project);
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
        </div>
    )
}

export default ModificacionHoras
// import { Autocomplete, useMediaQuery } from '@mui/material'
// import Button from '@mui/material/Button';
// import { useProject, useTask } from '../../services/projects';
// import { updateRegistro, useRecurso, useRegistro } from '../../services/rrhh';
// import { Options, Project, Recurso } from '../../services/types'
// import { zeroPad } from '../../util/util';
// import FormField from "../../components/common/Form/FormField";
// import { Formik, Form } from "formik";
// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import { toast } from 'react-toastify';
// import { useRouter } from "next/router";

// export default function BoxSelector(props:{options:Project[],label?:string}) {
    
//     const [projectValue, setProjetc] = React.useState<Options | null>();
//     const [inputProject, setInputProject] = React.useState('');
//     const [tasksValue,setTasks] = React.useState<Options | null>();
//     const [inputTask, setInputTask] = React.useState('');
//     const [recursoValue,setRecurso] = React.useState<Recurso | null>();
//     const [inputRecurso, setInputRecurso] = React.useState('');

//     const { project } = useProject((projectValue?.id ?? null) as unknown as string);
//     const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
//     {project && console.log(project.tasks ?? []);}
//     {console.log("TASK " + task?.collaborators);}

//     const router = useRouter();
//     const registroId = router.query.id as string
//     const { registro } = useRegistro(registroId)

//     console.log(registro.id_proyecto)
//     console.log(registro)

//     // 
//     const initialValues = {
//         // fecha: registro?.fecha_trabajada ?? "",
//         // cantidad_horas: registro?.cantidad_horas ?? "",
//     };
    
//     const validate = (values: any) => {
//     const errors: any = {};
    
//     return errors;
//     };

//     const onSubmit = async (values: any) => {
//     try {
//         // await updateRegistro(registro, registroId);
//         toast.success("Tarea guardada correctamente");
//     } catch (e) {
//         console.error(e);
//         toast.error("Error al guardar la tarea");
//     }
//     };
//     // 

//     return (
//         <>
//         <h3> Seleccionar Proyecto </h3>
//         <Box options = {props.options} 
//         label={registro.nombre_proyecto}
//         setValue= {setProjetc}
//         setInputValue= {setInputProject}
//         value={projectValue ?? null}
//         inputValue={inputProject}
//         disabled={false}/>

//         <h3>Seleccionar tarea </h3>
//         <Box options={project?.tasks ?? []} 
//         label={"Tareas"}
//         setValue= {setTasks}
//         setInputValue= {setInputTask}
//         value={tasksValue ?? null}
//         inputValue={inputTask }
//         disabled={true}/>

//         <h3>Seleccionar recurso</h3>
//         <RecursoBox options={task?.collaborators ?? []} 
//         label={"Recursos"}
//         setValue= {setRecurso}
//         setInputValue= {setInputRecurso}
//         value={recursoValue ?? null}
//         inputValue={inputRecurso }
//         disabled={true}/>
        
//         <Formik
//         initialValues={initialValues}
//         validate={validate}
//         onSubmit={onSubmit}
//         >
//         {({ isSubmitting }) => (
//           <Form>
//             <div>           
//                 <h3>Seleccionar fecha</h3>
//                 <FormField
//                 name="fecha"
//                 type="date"
//                 label="Fecha trabajada"
//                 />

//                 <h3>Seleccionar cantidad horas</h3>
//                 <FormField
//                 name="cantidad_horas"
//                 type="int"
//                 label="Cantidad horas"
//                 />
//             </div>
//         <br />
//           </Form>
//         )}
//       </Formik>

//         <br /><br />
//         <div style={{display:"flex", justifyContent: "space-around"}}>
//             <Button style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"red"}} type="submit" variant="outlined" href='rrhh/recursos'>Eliminar</Button>
//             <Button style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"green"}} type="submit" variant="outlined" href='rrhh/recursos'>Actualizar</Button>
//         </div>
//         </>
//       );
// };

// function Box(props: {
//     options:Options[], 
//     label:string,
//     setValue: Function,
//     setInputValue:Function,
//     value:Options | null,
//     inputValue:string,
//     disabled:boolean,
//     }){
//     return (
//     <>
//         <Autocomplete
//             id="controllable-states-demo"
//             value={props.value ?? undefined}
//             disabled = {(props.options?.length === 0 && props.disabled)? true: false}
//             options={props.options}
//             onChange={(event: any, newOption: Options | null | undefined) => {
//                 props.setValue(newOption);
//             } }
//             inputValue={props.inputValue}
//             onInputChange={(event, newInputValue) => {
//                 props.setInputValue(newInputValue);
//             } }
//             sx={{ width: "100%" }}
//             renderInput={(params) => <TextField {...params} label={props.label}/>}
//             getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} />
//     </>);
// }

// function RecursoBox(props: {
//     options:Recurso[], 
//     label:string,
//     setValue: Function,
//     setInputValue:Function,
//     value:Recurso | null,
//     inputValue:string,
//     disabled:boolean,
//     }){
//    const {recurso} = useRecurso(props.value as unknown as string);
//    props.setValue(recurso);
//     return (
//     <>
//         <Autocomplete
//             id="controllable-states-demo"
//             value={props.value ?? undefined}
//             disabled = {(props.options?.length === 0 && props.disabled)? true: false}
//             options={props.options}
//             onChange={(event: any, newOption: Recurso | null | undefined) => {
//                 props.setValue(newOption);
//             } }
//             inputValue={props.inputValue}
//             onInputChange={(event, newInputValue) => {
//                 props.setInputValue(newInputValue);
//             } }
//             sx={{ width: "100%"}}
//             renderInput={(params) => <TextField {...params} label={props.label}/>}
//             getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + (option?.name??'') +" - " + option?.lastname??''} />
//     </>);
// }

