import { routeToRegistro } from "../../util/util";
import RegistrosList from "../../components/rrhh/registros/RegistrosList";
import MenuHome from "../../components/rrhh/MenuHome";
import { ListRegistosBar } from "../../components/common/ListBar";
import { useRegistrosDeHoras } from "../../services/rrhh";
import React, { useState } from "react";
import { NextPage } from "next";
import Loading from "../../components/common/Loading";
import { Alert } from "@mui/material";
import RegistroModal from "../../components/rrhh/registros/RegistroModal";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const registrosData = useRegistrosDeHoras();
  const router = useRouter();
  const { cargarEn } = router.query;
  const [open, setOpen] = useState(!!cargarEn);

  return (
    <div>
      <div className="page">
        <MenuHome handleNew={() => setOpen(true)} />
        {registrosData.loading && !registrosData.error ? <Loading /> : ""}
        {registrosData.error ? (
          <Alert severity="error" style={{ width: "100%" }}>
            No se pudieron cargar los registros de horas
          </Alert>
        ) : null}
        {Array.isArray(registrosData.registrosDeHoras) ? (
          <>
            <ListRegistosBar
              label="registros"
              options={registrosData.registrosDeHoras}
              routeFunction={routeToRegistro}
            />
            <RegistrosList {...registrosData} />
          </>
        ) : (
          <div className="page" style={{ textAlign: "center" }}>
            <h2>No hay registros de horas cargados</h2>
            <h3>Por favor registre sus horas trabajadas</h3>
          </div>
        )}
        <RegistroModal
          open={open}
          defaultValues={
            cargarEn
              ? {
                  //@ts-ignore
                  project_id: cargarEn?.split("-")[0],
                  //@ts-ignore
                  project_name: cargarEn?.split("-")[1],
                  //@ts-ignore
                  task_id: cargarEn?.split("-")[2],
                  //@ts-ignore
                  task_name: cargarEn?.split("-")[3],
                }
              : {}
          }
          onClose={() => {
            setOpen(false);
            router.replace("/rrhh", undefined, { shallow: true });
          }}
          onSave={registrosData?.mutate}
        />
      </div>
    </div>
  );
};
export default Home;
