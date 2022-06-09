export { default as useSWR } from "swr";

const projectsApi = "https://aninfo-projects.herokuapp.com/api/v1";

export const projectsFetch = async (
  url: string,
  request?: RequestInit | undefined
) => {
  return fetch(projectsApi + url, {
    ...request,
  }).then((res) => res.json());
};
