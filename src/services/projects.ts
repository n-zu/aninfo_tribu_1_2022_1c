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

export const useTask = (taskId: string, initialTask?: Task) => {
  const { data, error, isValidating, ...rest } = useSWR(
    taskId ? "/tasks/" + taskId : null,
    projectsFetch,
    {
      fallbackData: initialTask,
    }
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

export const useEmployee = (id: number) => {
  const { data, error, isValidating, ...rest } = useSWR(
    `/recursos/${id}`,
    rrhhFetch
  );
  const loadingEmployee = !data && isValidating;

  const employee = error ? null : (data as Employee);

  return { employee, error, loadingEmployee, ...rest };
};

const useTRs = (name: string, id: number) => {
  const { data, error, isValidating, ...rest } = useSWR(
    id ? `/rrhh/${name}/${id}` : null,
    rrhhFetch
  );
  const loading = !data && isValidating;

  const timeRegistries = data as any;
  const totalTime =
    timeRegistries?.reduce(
      (acc: number, curr: any) => acc + curr.cantidad,
      0
    ) ?? 0;

  return {
    timeRegistries,
    totalTime,
    error,
    loading,
  };
};

export const useProjectTRs = (projectId: number) =>
  useTRs("proyecto", projectId);

export const useTaskTRs = (projectId: number) => useTRs("tarea", projectId);
