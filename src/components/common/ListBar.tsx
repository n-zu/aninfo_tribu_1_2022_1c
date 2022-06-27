import { Button }  from '@mui/material';
import AutoComplete, { AutoCompleteRecurso } from "./AutoComplete";
import { Options, OptionsRegistros } from "../../services/types";

type BarProps = {
  handleNew: () => void;
  label: string;
  options: Options[];
  routeFunction: Function;
};

export default function ListBar(props: { handleNew:  () => void; label: string; options: Options[]; routeFunction: Function }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        margin: "10px 0 20px",
      }}
    >
      <AutoComplete
        options={props.options}
        label={"Buscar " + props.label}
        routeFunction={props.routeFunction} />
      <Button
        style={{
          whiteSpace: "nowrap",
          padding: "0 2em",
          height: "2.5em",
          minWidth: "10em",
        }}
        variant="contained"
        color="primary"
        onClick={props.handleNew}
      >
        Crear {props.label}
      </Button>

    </div>
  );
}

export function ListBarRRHH(props: { label: string; options: OptionsRegistros[]; routeFunction: Function }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 10,
        margin: "10px 0 20px",
      }}
    >
      <AutoCompleteRecurso
        options={props.options}
        label={"Buscar " + props.label}
        routeFunction={props.routeFunction} />
    </div>
  );
}