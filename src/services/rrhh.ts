import { rrhhApi, useSWR } from "./requests";
import { Recurso, Registro, RegistroDeHoras } from "./types";

const saveHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
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
    "/rrhh/",
    rrhhFetch
  );
  const loading = !data && isValidating;
  const registrosDeHoras = data as RegistroDeHoras[];

  return { registrosDeHoras, error, loading, ...rest };
};

export const useRegistro = (registroId: string) => {
  const { data, error, isValidating, ...rest } = useSWR(
    registroId ? "/rrhh/registro/" + registroId : null,
    rrhhFetch
  );
  const loading = !data && isValidating;

  const registro = data as Registro;

  console.log(error);

  return { registro, error, loading, ...rest };
};

export const useRecursos = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/recursos/",
    rrhhFetch
  );
  const loading = !data && isValidating;

  const recursos = data as Recurso[];

  return { recursos, error, loading, ...rest };
};

export const useRecurso = (recursoId: string) => {
  const { data, error, isValidating, ...rest } = useSWR(
    recursoId ? "/recursos/" + recursoId : null,
    rrhhFetch
  );
  const loading = !data && isValidating;

  const recurso = data as Recurso;
  
  return { recurso, error, loading, ...rest };
};

export const updateRegistro = async (registro: RegistroDeHoras, registroId?: string) =>
await fetch(`${rrhhApi}/rrhh/${registroId ?? ""}`, {
  method: "PUT",
  headers: saveHeaders,
  body: JSON.stringify(removeEmpty(registro)),
});

const removeEmpty = <T>(object: T): T => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  ) as T;
};