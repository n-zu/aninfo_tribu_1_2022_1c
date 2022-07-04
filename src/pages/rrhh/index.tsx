import { routeToRegistro, tryParse } from "../../util/util";
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
  const _cargarEn = tryParse(cargarEn as string);
  const [open, setOpen] = useState(!!_cargarEn);

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
          defaultValues={_cargarEn}
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
