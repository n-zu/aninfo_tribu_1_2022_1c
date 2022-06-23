import { Button } from "@mui/material";
import AutoComplete from "./AutoComplete";
import { Options } from "../../services/types";

type BarProps = {
  handleNew: () => void;
  label: string;
  options: Options[];
  routeFunction: Function;
};

const ListBar = ({ handleNew, label, options, routeFunction }: BarProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "10px 0 20px",
      }}
    >
      <AutoComplete
        options={options}
        label={"Buscar " + label}
        routeFunction={routeFunction}
      />
      <Button
        style={{
          whiteSpace: "nowrap",
          padding: "0 2em",
          height: "2.5em",
          minWidth: "10em",
        }}
        variant="contained"
        color="primary"
        onClick={handleNew}
      >
        Crear {label}
      </Button>
    </div>
  );
};

export default ListBar;
