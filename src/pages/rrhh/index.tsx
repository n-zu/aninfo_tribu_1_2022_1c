import { useRegistrosDeHoras } from "../../services/rrhh";
import { RegistroDeHoras } from "../../services/types";
import { useState } from "react";
import { ListBarRRHH } from "../../components/common/ListBar";
import type { NextPage } from "next";

import { routeToRegistro } from "../../util/util";
import RegistroDeHorasList from "../../components/rrhh/RegistroDeHorasList";

const Home: NextPage = () => {
    const registrosData = useRegistrosDeHoras();
      //{console.log(registrosData)}
      return (
      <div>
        <div className="page">
          <ListBarRRHH
            label="registros"
            options={registrosData.registrosDeHoras}
            routeFunction={routeToRegistro}
          />
          <RegistroDeHorasList {...registrosData} />
        </div>
      </div>
  );
};

export default Home;