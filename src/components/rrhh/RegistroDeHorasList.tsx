import { RegistroDeHoras } from "../../services/types";
import styles from "./RegistroDeHoras.module.css";
import InfoCard from "../common/Card"
import RegistroDeHorasCard from "./RegistroDeHorasCard";

type RegistroDeHorasListProps = {
  registrosDeHoras: RegistroDeHoras[];
  error: any;
  loading: boolean;
};
const RegistroDeHorasList = ({ registrosDeHoras, error, loading }: RegistroDeHorasListProps) => {
  //{registrosDeHoras? console.log('RegistroDeHorasList Assertion'): console.log("RegistroDeHorasList Fail")}
  return (
    <div className={" flexContainer"}>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {registrosDeHoras?.map((registro: RegistroDeHoras, i: number) => (
          <RegistroDeHorasCard key={i} info={registro} link="/CargasDeHoras/registro?id="/>
      ))}
    </div>
  );
};

export default RegistroDeHorasList;
