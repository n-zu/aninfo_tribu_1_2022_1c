import { Chip, colors } from "@mui/material";
import { capitalize } from "../../util/util";

const getColor = (state: string) => {
  if (state.startsWith("cancelad")) return colors.orange[600];
  if (state.startsWith("bloquead")) return colors.red[600];
  if (state.startsWith("finalizad")) return colors.green[600];
  if (state === "en progreso") return colors.blue[600];
  return colors.grey[600];
};

type Props = {
  state: string;
};

const StateChip = ({ state }: Props) => {
  return (
    <Chip
      label={capitalize(state)}
      sx={{
        backgroundColor: getColor(state),
        color: "white",
        padding: "0 4px",
      }}
      size="small"
    />
  );
};

export default StateChip;
