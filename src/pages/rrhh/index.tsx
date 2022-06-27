import { useRegistrosDeHoras } from "../../services/rrhh";

import { ListBarRRHH } from "../../components/common/ListBar";
import type { NextPage } from "next";

import { routeToRegistro } from "../../util/util";
import RegistroDeHorasList from "../../components/rrhh/RegistroDeHorasList";
import MenuHome from "../../components/rrhh/MenuHome";

const Home: NextPage = () => {
    const registrosData = useRegistrosDeHoras();
    console.log(registrosData.registrosDeHoras);
      return (
      <div>
        <div className="page">
          <MenuHome/>
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