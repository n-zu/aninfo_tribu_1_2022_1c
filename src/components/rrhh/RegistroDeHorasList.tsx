import { RegistroDeHoras } from "../../services/types";
import RegistroDeHorasCard from "./RegistroDeHorasCard";

type RegistroDeHorasListProps = {
  registrosDeHoras: RegistroDeHoras[];
  error: any;
  loading: boolean;
};
const RegistroDeHorasList = ({ registrosDeHoras, error, loading }: RegistroDeHorasListProps) => {
  return (
    <div className={" flexContainer"}>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {registrosDeHoras?.map((registro: RegistroDeHoras, i: number) => (
          <RegistroDeHorasCard key={i} info={registro} link="/rrhh/registrohoras?id="/>
      ))}
    </div>
  );
};

export default RegistroDeHorasList;
