import React from "react";
import { Form, Formik, ErrorMessage } from "formik";
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import { useProject, useProjects, useTask } from "../../services/projects";
import { Options, Recurso, Registro } from "../../services/types";
import { zeroPad } from "../../util/util";
import {
  removeRegistro,
  updateRegistro,
  useRecurso,
  useRecursos,
} from "../../services/rrhh";
import { useState } from "react";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import FormField from "../common/Form/FormField";

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
  defaultRegistro: Registro;
  registroId: string;
  loadingRegistro?: boolean;
}) {
  const { recursos } = useRecursos();
  const defaultProject = useProject(props.defaultRegistro.id_proyecto).project;
  const defaultTask = useTask(props.defaultRegistro.id_tarea).task;
  const _defaultRecurso = useRecurso(props.defaultRegistro.id_recurso).recurso;
  const defaultRecurso = {
    id: _defaultRecurso?.id,
    name: _defaultRecurso?.name + " " + _defaultRecurso?.lastname,
  };

  const [projectValue, setProject] = useState<Options | null>(defaultProject);
  const [tasksValue, setTasks] = useState<Options | null>(defaultTask);
  const [recursoValue, setRecurso] = useState<Options | null>(defaultRecurso);

  const { projects, error, loading } = useProjects();
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

  const router = useRouter();

  const initialValues = {
    nombre_proyecto: projectValue?.name,
    nombre_tarea: tasksValue?.name,
    nombre_recurso: recursoValue?.name,
    id_proyecto: projectValue?.id,
    id_tarea: tasksValue?.id,
    id_recurso: recursoValue?.id,
    cantidad: props.defaultRegistro?.cantidad,
    fecha_trabajada: props.defaultRegistro?.fecha_trabajada,
  };
  const onSubmit = async (values: any) => {
    try {
      updateRegistro(values as unknown as Registro, props.registroId);
      toast.success("Registro successfully updated");
    } catch (err) {
      console.error(err);
      toast.error("ErrorMessage successfully updated");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {loading && !error ? (
              <Loading />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      onChange={(event: any, newOption: Options | null) => {
                        setProject(newOption);
                        setFieldValue("nombre_proyecto", newOption?.name);
                        setFieldValue("id_proyecto", newOption?.id);
                      }}
                      disabled={loading}
                      defaultValue={defaultProject}
                      renderInput={(params) => (
                        <TextField {...params} label={"Proyectos"} />
                      )}
                      options={projects}
                      getOptionLabel={(option) =>
                        zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                      }
                    />
                    <ErrorMessage
                      name={"nombre_proyecto"}
                      component="div"
                      className="FormErrorMessage"
                    />
                  </div>

                  <div>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      defaultValue={defaultTask}
                      options={project?.tasks ?? []}
                      disabled={loading}
                      onChange={(event: any, newOption: Options | null) => {
                        setTasks(newOption);
                        setFieldValue("nombre_tarea", newOption?.name);
                        setFieldValue("id_tarea", newOption?.id);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label={"Tareas"} />
                      )}
                      getOptionLabel={(option) =>
                        zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                      }
                    />
                    <ErrorMessage
                      name={"nombre_tarea"}
                      component="div"
                      className="FormErrorMessage"
                    />
                  </div>

                  <div>
                    <Autocomplete
                      defaultValue={defaultRecurso}
                      disabled={loading}
                      options={(collaborators as Options[]) ?? []}
                      onChange={(event: any, newOption: Options | null) => {
                        setRecurso(newOption);
                        setFieldValue("nombre_recurso", newOption?.name);
                        setFieldValue("id_recurso", newOption?.id);
                      }}
                      sx={{ width: "100%" }}
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
                      label="Fecha de trabajo"
                      type="date"
                      disabled={loading}
                    />
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      style={{
                        width: "25%",
                        borderColor: "black",
                        color: "white",
                        backgroundColor: "red",
                      }}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={(event) => {
                        try {
                          removeRegistro(props.registroId);
                          toast.success("Registro deleted successfully");
                          setTimeout(function () {
                            router.push("/rrhh");
                          }, 5000);
                        } catch (err) {
                          console.error(err);
                          toast.error("ErrorMessage deleted successfully");
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                    <Button
                      style={{ width: "25%" }}
                      type="submit"
                      variant="contained"
                      startIcon={<SaveAltIcon />}
                    >
                      Actualizar
                    </Button>
                  </div>
                </div>
              </>
            )}
            {error ? (
              <Alert severity="error" style={{ width: "100%" }}>
                No se pudieron cargar los proyectos
              </Alert>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}
