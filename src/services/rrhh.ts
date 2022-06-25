import { rrhhApi, useSWR } from "./requests";
import { RegistroDeHoras } from "./types";


const header = new Headers({ "Access-Control-Allow-Origin": "*" });

export const rrhhFetch = async (url: string, request?: any) => {
  {console.log(rrhhApi + url)}
  return await fetch(rrhhApi + url,{
    header: header,
    ...request,
  }).then((res) => res.json()
  ).catch((err) => {
    console.error("Comienzo del error");
    console.error(err);
    })
};

export const useRegistrosDeHoras = () => {
  const { data, error, isValidating, ...rest } = useSWR(
    "/CargasDeHoras/",
    rrhhFetch
  );
 // console.log("data not convert registro");
 // console.log(data);

  const loading = !data && isValidating;
  const registrosDeHoras = data as RegistroDeHoras[];
 // console.log("data convert registro");
 // console.log(data);
 // console.log(error);

  return { registrosDeHoras, error, loading, ...rest };
};