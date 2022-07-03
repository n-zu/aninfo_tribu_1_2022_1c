import React from "react";
import { useFormik } from "formik";
import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import { useProject, useProjects, useTask } from "../../services/projects";
import { Options, Recurso, Registro } from "../../services/types";
import { zeroPad } from "../../util/util";
import {
  removeRegistro,
  updateRegistro,
  useRecurso,
} from "../../services/rrhh";
import { useState } from "react";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const today = dayjs().format("YYYY-MM-DD");

const validate = (values: any) => {
  const errors: any = {};
  if (!values.nombre_proyecto) errors.nombre_proyecto = "Requerido";
  if (!values.nombre_tarea) errors.nombre_tarea = "Requerido";
  if (!values.nombre_recurso) errors.nombre_recurso = "Requerido";
  if (!values.cantidad) errors.cantidad = "Requerido";
  if (!values.fecha_trabajada) errors.fecha_trabajada = "Requerido";
  if (values.fecha_trabajada > today)
    errors.fecha_trabajada =
      "La fecha de finalización debe ser mayor a la de inicio";
  console.log(errors);
  return errors;
};

export default function RegistroForm(props: {
  defaultRegistro: Registro;
  registroId: string;
  loadingRegistro?: boolean;
}) {
  // const defaultProject : Options = useProject(props.defaultRegistro.id_proyecto).project as Options
  // const defaultTask : Options = useTask(props.defaultRegistro.id_tarea).task as Options
  // const defaultRecurso : Options = useRecurso(props.defaultRegistro.id_recurso).recurso as Options
  const defaultProject = useProject(props.defaultRegistro.id_proyecto).project;
  const loadingProject = useProject(props.defaultRegistro.id_proyecto).loading;
  const defaultTask = useTask(props.defaultRegistro.id_tarea).task;
  const defaultRecurso = useRecurso(props.defaultRegistro.id_recurso).recurso;

  const [projectValue, setProject] = useState<Options | null>(defaultProject);
  const [tasksValue, setTasks] = useState<Options | null>(defaultTask);
  const [recursoValue, setRecurso] = useState<Options | null>(defaultRecurso);

  const { projects, error, loading } = useProjects();
  const { project } = useProject(
    (projectValue?.id ?? null) as unknown as string
  );
  const { task } = useTask((tasksValue?.id ?? null) as unknown as string);
  const date = props.defaultRegistro.fecha_trabajada;

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre_proyecto: projectValue?.name,
      nombre_tarea: tasksValue?.name,
      nombre_recurso: recursoValue?.name,
      id_proyecto: projectValue?.id,
      id_tarea: tasksValue?.id,
      id_recurso: recursoValue?.id,
      cantidad: props.defaultRegistro?.cantidad,
      fecha_trabajada: props.defaultRegistro?.fecha_trabajada,
    },
    validate: validate,
    onSubmit: async (values) => {
      try {
        updateRegistro(values as unknown as Registro, props.registroId);
        toast.success("Registro successfully updated");
      } catch (err) {
        console.error(err);
        toast.error("ErrorMessage successfully updated");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {loading && !error ? (
          <Loading />
        ) : (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event: any, newOption: Options | null) => {
                    setProject(newOption);
                    formik.values.nombre_proyecto = newOption?.name;
                    formik.values.id_proyecto = newOption?.id;
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
              </div>

              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  defaultValue={defaultTask}
                  options={project?.tasks ?? []}
                  disabled={loading}
                  onChange={(event: any, newOption: Options | null) => {
                    setTasks(newOption);
                    formik.values.id_tarea = newOption?.id;
                    formik.values.nombre_tarea = newOption?.name;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={"Tareas"} />
                  )}
                  getOptionLabel={(option) =>
                    zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                  }
                />
              </div>

              <div>
                <Autocomplete
                  defaultValue={defaultRecurso}
                  disabled={loading}
                  options={(task?.collaborators as Recurso[]) ?? []}
                  onChange={(event: any, newOption: Recurso | null) => {
                    setRecurso(newOption);
                    formik.values.id_recurso = newOption?.id;
                    formik.values.nombre_recurso = newOption?.name;
                  }}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label={"Recursos"} />
                  )}
                  getOptionLabel={(option) =>
                    zeroPad(option?.id ?? 0) + " - " + option?.name ?? ""
                  }
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  id="cantidad"
                  type="number"
                  name="cantidad"
                  label="Cantidad"
                  defaultValue={props.defaultRegistro.cantidad}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cantidad && Boolean(formik.errors.cantidad)
                  }
                  helperText={formik.touched.cantidad && formik.errors.cantidad}
                />
              </div>

              <div>
                <TextField
                  id="fecha_trabajada"
                  type="date"
                  defaultValue={props.defaultRegistro.fecha_trabajada}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cantidad && Boolean(formik.errors.cantidad)
                  }
                  helperText={formik.touched.cantidad && formik.errors.cantidad}
                  sx={{ width: "100%" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
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
      </form>
    </div>
  );
}
