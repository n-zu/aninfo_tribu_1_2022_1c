import { projectsApi, useSWR } from "./requests";
import { Project } from "./types";

export const projectsFetch = async (url: string, request?: any) => {
  return fetch(projectsApi + url, {
    ...request,
  }).then((res) => res.json());
};

export const useProjects = () => {
  const {
    data: projects,
    error,
    isValidating,
  } = useSWR("/projects/", projectsFetch);
  const loading = !projects && isValidating;

  return { projects, error, loading };
};

export const createProject = (project: Project) => {
  fetch(projectsApi + "/projects/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(project),
  });
};
