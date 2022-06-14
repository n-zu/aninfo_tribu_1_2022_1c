import { Button } from "@material-ui/core";

type BarProps = {
  handleNew: () => void;
  label: string;
};

const ListBar = ({ handleNew, label }: BarProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        margin: "10px 0 20px",
      }}
    >
      <input
        type="text"
        style={{ width: "100%", height: "2em" }}
        placeholder="Buscar por nombre"
      />
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
