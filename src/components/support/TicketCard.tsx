import NextLink from "next/link";
import { Box, ButtonBase, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import es from "dayjs/locale/es"
import relativeTime from "dayjs/plugin/relativeTime"
import { Ticket } from "@services/support";
import TicketStatusChip from "src/components/support/TicketStatusChip"

dayjs.locale(es)
dayjs.extend(relativeTime)

const TicketCard = ({ projectId, id, title, deadline, priority, severity, state }: Ticket & { projectId: string }) => {
    return <NextLink href={`/support/${projectId}/tickets/${id}`}>
        <ButtonBase sx={{ width: "100%" }}>
            <Card sx={{ width: "100%" }}>
                <CardContent>
                    <Box>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography><strong>#{id}</strong> {title}</Typography>
                            <TicketStatusChip label={state} />
                        </Stack>
                    </Box>

                    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                        <Typography>Vence {dayjs(deadline).fromNow()}</Typography>
                        <Typography>Prioridad: {priority}</Typography>
                        <Typography>Severidad: {severity}</Typography>
                    </Stack>
                </CardContent>
            </Card>
        </ButtonBase>
    </NextLink>
}

export default TicketCard;