import { rrhhApi, useSWR } from "./requests";
import { RegistroDeHoras } from "./types";

export const rrhhFetch = async (url: string, request?: any) => {
  return fetch(rrhhApi + url, {
    mode: 'no-cors',
    ...request,
  }).then((res) => res.json());
};

export const useRegistrosDeHoras = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/CargasDeHoras/",
    rrhhFetch
  );
  const loading = !data && isValidating;
  const registrosDeHoras = data as RegistroDeHoras[];

  return { registrosDeHoras, error, loading, ...rest };
};