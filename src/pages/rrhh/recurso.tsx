import type { NextPage } from "next";

import { useProject } from "../../services/projects";
import { useRouter } from "next/router";
import { zeroPad } from "../../util/util";
import { useRecurso } from "../../services/rrhh";


const cte = {
  legajo: 10,
  nombre: "lucas",
  apellido: "waisten"
}

const Recurso: NextPage = () => {
  const router = useRouter();
  const recursoId = router?.query?.id as string;
  const { recurso, error, loading, mutate } = useRecurso(recursoId);

  console.log("ID REGISTRO");
  console.log(cte);
  return (
    <div className="page">
          <p>Legajo {cte?.legajo}</p>
          <p>Nombre {cte?.nombre}</p>
          <p>Apellido {cte?.apellido}</p>
      {/*loading ? "LOADING" : ""*/}
      {/*error ? "ERROR" : ""*/}
      {/*recurso && (
        <>
          <h1>
            {zeroPad(recurso?.legajo ?? 0)} - {recurso?.nombre} - {recurso?.apellido}
          </h1>
          <p>Legajo {recurso?.legajo}</p>
          <p>Nombre {recurso?.nombre}</p>
          <p>Apellido {recurso?.apellido}</p>
        </>
      )*/
      }
    </div>
  );
};

export default Recurso;