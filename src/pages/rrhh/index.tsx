import { NextPage } from "next";
import { routeToRegistro } from "../../util/util";
import RegistrosList from "../../components/rrhh/RegistrosList";
import MenuHome from "../../components/rrhh/MenuHome";
import { ListRegistosBar } from "../../components/common/ListBar";
import { useRegistrosDeHoras } from "../../services/rrhh";

const Home: NextPage = () => {
    const registrosData = useRegistrosDeHoras();
    console.log(registrosData.registrosDeHoras);
      return (
      <div>
        <div className="page">
          <MenuHome/>
          <ListRegistosBar
            label="registros"
            options={registrosData.registrosDeHoras}
            routeFunction={routeToRegistro}
          />
          <RegistrosList {...registrosData} />
        </div>
      </div>
  );
};

export default Home;