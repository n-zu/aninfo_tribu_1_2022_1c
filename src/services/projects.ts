import { projectsApi, useSWR } from "./requests";
import { Project, Task } from "./types";

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
  }).then((res) => res.json());
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
    body: JSON.stringify(project),
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

export const saveTask = async (task: Task, projectId?: string, taskId?: number) =>
  await fetch(projectsApi + (projectId ? `/projects/${projectId}/tasks/` : `/tasks/${taskId}`), {
    method: projectId ? "POST" : "PUT",
    headers: saveHeaders,
    body: JSON.stringify(task),
  }).then(checkStatus);
