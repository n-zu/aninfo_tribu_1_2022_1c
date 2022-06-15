import { Button } from "@material-ui/core";
import AutoComplete from "./AutoComplete";
import { Options } from "../../services/types";

type BarProps = {
  handleNew: () => void;
  label: string;
  options: Options[];
};

const ListBar = ({ handleNew, label, options }: BarProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        margin: "10px 0 20px",
      }}
    >
      <AutoComplete options={options} label={label + "s"}/>
      <Button
        style={{
          whiteSpace: "nowrap",
          padding: "0.5em 2.5em",
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
