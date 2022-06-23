import { useRegistrosDeHoras } from "../../services/rrhh";
import { RegistroDeHoras } from "../../services/types";
import { useState } from "react";
import ListBar from "../../components/common/ListBar";
import type { NextPage } from "next";
import { routeToRegistro } from "../../util/util";
import RegistroDeHorasList from "../../components/rrhh/RegistroDeHorasList";

const rrhhApi = "https://aninfo-rrhh.herokuapp.com";

const Home: NextPage = () => {
  const registrosData = useRegistrosDeHoras();
  const [open, setOpen] = useState(false)
  return (
      <div>
        <div className="page">
          <ListBar
            handleNew={() => setOpen(true)}
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
