import { RegistroDeHoras } from "../../services/types";
import RegistroCard from "./RegistroCard";

type RegistroDeHorasListProps = {
  registrosDeHoras: RegistroDeHoras[];
  error: any;
  loading: boolean;
};
const RegistrosList = ({ registrosDeHoras, error, loading }: RegistroDeHorasListProps) => {
  return (
    <div className={" flexContainer"}>
      {loading ? "LOADING" : ""}
      {error ? "ERROR" : ""}
      {registrosDeHoras?.map((registro: RegistroDeHoras, i: number) => (
        <RegistroCard key={i} info={registro} link="/rrhh/registrohoras?id="/>
      ))}
    </div>
  );
};

export default RegistrosList;