import { Chip, colors } from "@mui/material";
import { FunctionComponent } from "react";

type TicketStatusChipProps = {
    label: string
}

const TicketStatusChip: FunctionComponent<TicketStatusChipProps> = ({label}) => {
    return <Chip label={label} sx={{ backgroundColor: colors.blue[600], color: "white" }} />
}

export default TicketStatusChip;