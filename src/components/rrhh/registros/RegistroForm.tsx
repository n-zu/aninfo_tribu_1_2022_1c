import React, { useEffect } from "react";
import { ErrorMessage, Form, Formik, useFormik } from "formik";
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useProject, useProjects, useTask } from "../../../services/projects";
import { Options, Recurso, Registro } from "../../../services/types";
import { zeroPad } from "../../../util/util";
import Loading from "../../common/Loading";
import { saveRegistro, useRecursos } from "../../../services/rrhh";
import dayjs from "dayjs";
import FormField from "../../common/Form/FormField";

const today = dayjs().format("YYYY-MM-DD");

const validate = (values: any) => {
  const errors: any = {};
  if (!values.nombre_proyecto) errors.nombre_proyecto = "Requerido";
  if (!values.nombre_tarea) errors.nombre_tarea = "Requerido";
  if (!values.id_recurso) errors.id_recurso = "Requerido";
  if (!values.cantidad) errors.cantidad = "Requerido";
  if (values?.cantidad < 1 || values?.cantidad > 8)
    errors.cantidad = "La cantidad ingresada debe ser entre 1 y 8 horas";
  if (!values.fecha_trabajada) errors.fecha_trabajada = "Requerido";
  if (values.fecha_trabajada > today)
    errors.fecha_trabajada =
      "La fecha trabajada debe ser anterior a la fecha actual";
  return errors;
};

export default function RegistroForm(props: {
  onSave?: Function;
  onClose?: Function;
  setDisabled?: Function;
  defaultValues: {
    project_id: number;
    project_name: string;
    task_id: number;
    task_name: string;
  };
}) {
  const { recursos } = useRecursos();
  const { projects, error, loading } = useProjects();
  const [projectValue, setProject] = useState<Options | null>(
    props?.defaultValues?.project_id
      ? {
          id: props.defaultValues.project_id,
          name: props.defaultValues.project_name,
        }
      : null
  );
  const [tasksValue, setTasks] = useState<Options | null>(
    props?.defaultValues?.task_id
      ? {
          id: props.defaultValues.task_id,
          name: props.defaultValues.task_name,
        }
      : null
  );
  const [recursoValue, setRecurso] = useState<Recurso | null>();
  const { project } = useProject(
    (projectValue?.id ?? null) as unknown as string
  );
  const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
  const collaborators =
    task?.collaborators?.map((colab: any) => {
      const res = recursos.find((recurso: Recurso) => {
        return recurso.id === colab.id;
      });

      if (!res) return undefined;

      return {
        ...colab,
        name: res?.name + " " + res?.lastname,
      };
    }) ?? [];

  const initialValues = {
    nombre_proyecto: props?.defaultValues?.project_name ?? projectValue?.name,
    nombre_tarea: props?.defaultValues?.task_name ?? tasksValue?.name,
    nombre_recurso: " ",
    id_proyecto: props?.defaultValues?.project_id ?? projectValue?.id,
    id_tarea: props?.defaultValues?.task_id ?? tasksValue?.id,
    id_recurso: recursoValue?.id,
    cantidad: " ",
    fecha_trabajada: today,
  };

  const onSubmit = async (values: any) => {
    toast.info("Cargando...");
    try {
      await saveRegistro(values as unknown as Registro);
      toast.success("Registros de horas guardado correctamente");
      props.onSave?.();
      props.onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Error: Registro de horas invalido");
    }
  };

  return (
    <div>
      {error ? (
        <Alert severity="error" style={{ width: "100%" }}>
          No se pudieron cargar los proyectos
        </Alert>
      ) : null}

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <h3>Nuevo Registro de horas</h3>
            <div>
              <Autocomplete
                sx={{ width: "100%", marginTop: "10px" }}
                onChange={(event: any, newOption: Options | null) => {
                  setProject(newOption);
                  setFieldValue("nombre_proyecto", newOption?.name);
                  setFieldValue("id_proyecto", newOption?.id);
                }}
                disabled={loading || !!values?.id_tarea}
                renderInput={(params) => (
                  <TextField {...params} label={"Proyectos"} />
                )}
                options={projects}
                getOptionLabel={(option) =>
                  zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                }
                defaultValue={projectValue}
              />
              <ErrorMessage
                name={"nombre_proyecto"}
                component="div"
                className="FormErrorMessage"
              />
            </div>

            <div>
              <Autocomplete
                sx={{ width: "100%", marginTop: "10px" }}
                options={project?.tasks ?? (tasksValue ? [tasksValue] : [])}
                disabled={loading || !values.id_proyecto || !!values.id_recurso}
                onChange={(event: any, newOption: Options | null) => {
                  setTasks(newOption);
                  setFieldValue("id_tarea", newOption?.id);
                  setFieldValue("nombre_tarea", newOption?.name);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={"Tareas"} />
                )}
                getOptionLabel={(option) =>
                  zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                }
                defaultValue={tasksValue}
              />
              <ErrorMessage
                name={"nombre_tarea"}
                component="div"
                className="FormErrorMessage"
              />
            </div>

            <div>
              <Autocomplete
                options={(collaborators as Recurso[]) ?? []}
                onChange={(event: any, newOption: Recurso | null) => {
                  setRecurso(newOption);
                  setFieldValue("id_recurso", newOption?.id);
                  setFieldValue("nombre_recurso", newOption?.name);
                }}
                disabled={loading || !values.id_tarea}
                sx={{ width: "100%", marginTop: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label={"Recursos"} />
                )}
                getOptionLabel={(option) =>
                  zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                }
              />
              <ErrorMessage
                name={"id_recurso"}
                component="div"
                className="FormErrorMessage"
              />
            </div>

            <div>
              <FormField
                name="cantidad"
                label="Cantidad"
                type="number"
                disabled={loading}
              />
            </div>

            <div>
              <FormField
                name="fecha_trabajada"
                label="Fecha trabajada"
                type="date"
                disabled={loading}
              />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                sx={{ marginBottom: "0.5rem" }}
                startIcon={<SaveAltIcon />}
              >
                Cargar
              </Button>
              {loading && !error ? <Loading /> : <></>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
