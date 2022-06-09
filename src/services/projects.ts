import { projectsFetch, useSWR } from "./requests";

export const useProjects = () => {
  const {
    data: projects,
    error,
    isValidating,
  } = useSWR("/projects", projectsFetch);
  const loading = !projects && isValidating;

  return { projects, error, loading };
};

export const useCreateProject = () => {
  return (name: string) =>
    projectsFetch("/projects", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
};
