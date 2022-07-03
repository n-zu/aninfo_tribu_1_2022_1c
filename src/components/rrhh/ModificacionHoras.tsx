import React from 'react'
import { useState } from 'react'
import { useProject, useProjects, useTask } from '../../services/projects'
import { updateRegistro, useRecurso } from '../../services/rrhh'
import { Options, Project, Recurso, Registro, Task } from '../../services/types'
import { Autocomplete, Button, TextField } from '@mui/material'
import { zeroPad } from '../../util/util';
import { Form, Formik } from 'formik'
import FormField from '../common/Form/FormField'
import { useRouter } from 'next/router'

const ModificacionHoras = (props: {registro: Registro}) => {

    const {project} = useProject(props.registro.id_proyecto)
    const {task} = useTask(props.registro.id_tarea)
    const {recurso} = useRecurso(props.registro.id_recurso)
    const projects = useProjects()

    const router = useRouter();
    const registroId = router?.query?.id as string;

    const initialValues = {
        id_proyecto: null,
        id_tarea: null,
        id_recurso: null,
        nombre_proyecto: null,
        nombre_tareaa: null,
        nombre_recurso: null,
        fecha: props.registro.fecha_trabajada,
        cantidad_horas: props.registro.cantidad,
    };
    
    const validate = (values: any) => {
    const errors: any = {};
    // console.log(values)
    if (!values.recurso) errors.recurso = "Requerido";
    if (!values.fecha) errors.fecha = "Requerido";
    if (!values.cantidad_horas) errors.cantidad_horas = "Requerido";
    return errors;
    };

    const onSubmit = async (values: any) => {
        try {
            console.log(values)
            // await updateRegistro(values, registroId);
        } catch (e) {
            console.error(e);
        }
    }; 

    return (
        <div className='page'>

        <Formik
            initialValues={initialValues}
            // validate={validate}
            onSubmit={onSubmit}
            >
            {({ handleChange, values, setFieldValue }) => (
            <Form>
                <div>           
                    <h3>Seleccionar Proyecto</h3>
                    <Autocomplete
                    options={projects.projects as Options[]}
                    getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} 
                    onChange={(event, newOption) => {
                        setFieldValue("id_proyecto", newOption?.id);
                        setFieldValue("nombre_proyecto", newOption?.name);
                    } }
                    renderInput={(params) => (
                    <TextField 
                        {...params} 
                        onChange={handleChange}
                        margin="normal"
                        label="Proyecto"
                        fullWidth
                        value={values?.id_proyecto}
                    />
                    )}
                    />    

                    {/* <h3>Seleccionar Tarea</h3>
                    <Autocomplete
                    options={initialValues.id_proyecto as Options[]}
                    getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} 
                    onChange={(event, newOption) => {
                        setFieldValue("tarea", newOption);
                    } }
                    renderInput={(params) => (
                    <TextField 
                        {...params} 
                        onChange={handleChange}
                        margin="normal"
                        label="Tarea"
                        fullWidth
                        value={values?.tarea}
                    />
                    )}
                    />               */}

                    {/* <h3>Seleccionar Recursos</h3>
                    <Autocomplete
                    options={initialValues.tarea.collaborators as Options[]}
                    getOptionLabel={(option) => zeroPad(option?.id ?? 0) + " - " + option?.name??''} 
                    onChange={(event, newOption) => {
                        setFieldValue("tarea", newOption);
                    } }
                    renderInput={(params) => (
                    <TextField 
                        {...params} 
                        onChange={handleChange}
                        margin="normal"
                        label="Tarea"
                        fullWidth
                        value={values?.tarea}
                    />
                    )}
                    />                 */}
  

                    <h3>Seleccionar fecha</h3>
                    <FormField
                    name="fecha"
                    type="date"
                    label="Fecha trabajada"
                    inputFormat="yyyy-MM-dd"
                    />

                    <h3>Seleccionar cantidad horas</h3>
                    <FormField
                    name="cantidad_horas"
                    type="int"
                    label="Cantidad horas"
                    />
                </div>
            <br />
            <div style={{display:"flex", justifyContent: "space-around"}}>
                {/* <Button style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"red"}} type="submit" variant="outlined">Eliminar</Button> */}
                <Button style={{width:"25%", borderColor:"black" , color:"white", backgroundColor:"green"}} type="submit" variant="contained">Actualizar</Button>
            </div>
            </Form>
            )}
            </Formik>
        </div>
    )
}

export default ModificacionHoras
