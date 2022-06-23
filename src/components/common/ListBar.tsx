import { Button } from "@material-ui/core";
import AutoComplete from "./AutoComplete";
import { Options } from "../../services/types";

type BarProps = {
  handleNew: () => void;
  label: string;
  options: Options[];
  routeFunction: Function;
  create?: boolean;
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

export function ListBarRRHH(props: { handleNew:  () => void; label: string; options: Options[]; routeFunction: Function }) {
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
        Proyectos {props.label}
      </Button>
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
        Tareas {props.label}
      </Button>
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
        Recursos {props.label}
      </Button>

    </div>
  );
}

