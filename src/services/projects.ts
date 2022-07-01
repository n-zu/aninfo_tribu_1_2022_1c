import { projectsApi, rrhhApi, useSWR } from "./requests";
import { Project, Task, Employee } from "./types";

const saveHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const checkStatus = (res: Response) => {
  if (!res.ok) throw new Error(res.statusText);
  return res;
};

export const projectsFetch = async (url: string, request?: any) => {
  return fetch(projectsApi + url, {
    ...request,
  })
    .then(checkStatus)
    .then((res) => res.json());
};

export const useProjects = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/projects/",
    projectsFetch
  );
  const loading = !data && isValidating;

  const projects = data as Project[];

  return { projects, error, loading, ...rest };
};

export const useProject = (projectId: string) => {
  const { data, error, isValidating, ...rest } = useSWR(
    projectId ? "/projects/" + projectId : null,
    projectsFetch
  );
  const loading = !data && isValidating;

  const project = data as Project;

  return { project, error, loading, ...rest };
};

export const saveProject = async (project: Project, id?: number) =>
  await fetch(`${projectsApi}/projects/${id ?? ""}`, {
    method: id == null ? "POST" : "PUT",
    headers: saveHeaders,
    body: JSON.stringify(removeEmpty(project)),
  }).then(checkStatus);

export const useTask = (taskId: string) => {
  const { data, error, isValidating, ...rest } = useSWR(
    taskId ? "/tasks/" + taskId : null,
    projectsFetch
  );
  const loading = !data && isValidating;

  const task = data as Task;

  return { task, error, loading, ...rest };
};

export const saveTask = async (
  task: Task,
  projectId?: string,
  taskId?: number
) =>
  await fetch(
    projectsApi +
      (projectId ? `/projects/${projectId}/tasks/` : `/tasks/${taskId}`),
    {
      method: projectId ? "POST" : "PUT",
      headers: saveHeaders,
      body: JSON.stringify(removeEmpty(task)),
    }
  ).then(checkStatus);

export const deleteCollaborator = async (colabId: number, taskId: string) => {
  console.log("delete path: " + `/tasks/${taskId}/collaborators/${colabId}`);
  return await fetch(
    projectsApi + `/tasks/${taskId}/collaborators/${colabId}`,
    {
      method: "DELETE",
      headers: saveHeaders,
    }
  ).then(checkStatus);
};

export const addCollaborator = async (colabId: number, taskId: string) => {
  console.log("delete path: " + `/tasks/${taskId}/collaborators/`);
  return await fetch(projectsApi + `/tasks/${taskId}/collaborators/`, {
    method: "POST",
    headers: saveHeaders,
    body: JSON.stringify({ employee_id: colabId }),
  }).then(checkStatus);
};

const removeEmpty = <T>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  ) as T;
};

export const rrhhFetch = async (url: string, request?: any) => {
  return fetch(rrhhApi + url, {
    ...request,
  })
    .then(checkStatus)
    .then((res) => res.json());
};

export const useEmployees = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/recursos/",
    rrhhFetch
  );
  const loadingEmployee = !data && isValidating;

  const employees = error ? [] : (data as Employee[]);

  return { employees, error, loadingEmployee, ...rest };
};

// FIXME: Remove this when the API is ready
const mockedRRHHData = [
  {
    nombre_proyecto: "Test de Gherkin",
    nombre_tarea: "Debuggear",
    nombre_recurso: "Juan Perez",
    id_proyecto: 1,
    id_tarea: 1,
    id_recurso: 7,
    cantidad: 5,
    fecha_trabajada: "2021-06-10",
    id_registro_horas: 89,
  },
  {
    nombre_proyecto: "Test de Gherkin",
    nombre_tarea: "Debuggear",
    nombre_recurso: "Juan Perez",
    id_proyecto: 1,
    id_tarea: 2,
    id_recurso: 9,
    cantidad: 3,
    fecha_trabajada: "2021-06-08",
    id_registro_horas: 90,
  },
  {
    nombre_proyecto: "Test de Gherkin",
    nombre_tarea: "Debuggear",
    nombre_recurso: "Juan Perez",
    id_proyecto: 1,
    id_tarea: 3,
    id_recurso: 43,
    cantidad: 8,
    fecha_trabajada: "2021-06-01",
    id_registro_horas: 91,
  },
  {
    nombre_proyecto: "Proyecto 1",
    nombre_tarea: "Tarea 1",
    nombre_recurso: "Recurso 1",
    id_proyecto: 3,
    id_tarea: 67,
    id_recurso: 32,
    cantidad: -6,
    fecha_trabajada: "2025-10-15",
    id_registro_horas: 92,
  },
];

const useTRs = (name: string, id: number) => {
  // const { data, error, isValidating, ...rest } = useSWR(
  //  projectId ? `/${name}/${id}`: null,
  //  rrhhFetch
  //);
  // const loading = !data && isValidating;
  // FIXME: Commented this out as RRHH endpoint is not working
  const data = mockedRRHHData;

  const timeRegistries = data as any;
  const totalTime = timeRegistries.reduce(
    (acc: number, curr: any) => acc + curr.cantidad,
    0
  );

  return {
    timeRegistries,
    totalTime,
    //error, loading, ...rest
  };
};

export const useProjectTRs = (projectId: number) =>
  useTRs("proyecto", projectId);

export const useTaskTRs = (projectId: number) => useTRs("tarea", projectId);
