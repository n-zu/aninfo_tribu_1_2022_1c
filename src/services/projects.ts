import { projectsApi, useSWR } from "./requests";
import { Project, Task } from "./types";

const postHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const projectsFetch = async (url: string, request?: any) => {
  return fetch(projectsApi + url, {
    ...request,
  }).then((res) => res.json());
};

export const useProjects = () => {
  const { data, error, isValidating } = useSWR("/projects/", projectsFetch);
  const loading = !data && isValidating;

  const projects = data as Project[];

  return { projects, error, loading };
};

export const useProject = (projectId: string) => {
  const { data, error, isValidating } = useSWR(
    projectId ? "/projects/" + projectId : null,
    projectsFetch
  );
  const loading = !data && isValidating;

  const project = data as Project;

  return { project, error, loading };
};

export const createProject = (project: Project) => {
  fetch(projectsApi + "/projects/", {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(project),
  });
};

export const createTask = (projectId: string, task: Task) => {
  fetch(`${projectsApi}/projects/${projectId}/tasks/`, {
    method: "POST",
    headers: postHeaders,
    body: JSON.stringify(task),
  });
};
