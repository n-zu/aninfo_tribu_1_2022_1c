import { rrhhApi, useSWR } from "./requests";
import { Recurso, RegistroDeHoras } from "./types";


const header = new Headers({ "Access-Control-Allow-Origin": "*" });

export const rrhhFetch = async (url: string, request?: any) => {
  {console.log(rrhhApi + url)}
  return await fetch(rrhhApi + url,{
    header: header,
    ...request,
  }).then((res) => res.json()
  ).catch((err) => {
    console.error(err);
    })
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

export const useRecursos = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/Recursos/",
    rrhhFetch
  );
  const loading = !data && isValidating;

  const projects = data as Recurso[];

  console.log(error);

  return { projects, error, loading, ...rest };
};