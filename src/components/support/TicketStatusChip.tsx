import { Chip, colors } from "@mui/material";
import { FunctionComponent } from "react";

type TicketStatusChipProps = {
  label: string;
  size?: "small" | "medium";
};

const getColor = (label: string) => {
  if (label === "Abierto") return colors.blue[600];
  if (label === "Cerrado") return colors.green[600];
  if (label === "En Progreso") return colors.orange[600];
  return colors.grey[600];
};

const TicketStatusChip: FunctionComponent<TicketStatusChipProps> = ({
  label,
  size,
}) => {
  return (
    <Chip
      label={label}
      size={size}
      sx={{ backgroundColor: getColor(label), color: "white" }}
    />
  );
};

export default TicketStatusChip;
