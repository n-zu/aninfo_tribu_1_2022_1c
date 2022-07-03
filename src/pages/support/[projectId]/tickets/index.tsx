import type { NextPage } from "next";
import NextLink from "next/link"
import dayjs from "dayjs";
import es from "dayjs/locale/es"
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from "next/router";
import { Card, CardContent, Chip, Divider, Stack, Typography, colors, Box, Container, ButtonBase } from "@mui/material";
import useSWR from "swr";
import { supportFetcher, Ticket } from "@services/support";

dayjs.locale(es)
dayjs.extend(relativeTime)

const SupportHome: NextPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { data: tickets, error } = useSWR<Ticket[]>("/tickets", supportFetcher)

  return (
    <Container className="page">
      <h1>Tickets de soporte</h1>

      <Stack direction="column" spacing={2}>
        {tickets?.map((ticket) => 
          <TicketCard key={ticket.id} projectId={projectId as string} {...ticket} />
        )}
      </Stack>
    </Container >
  );
};

const TicketCard = ({ projectId, id, title, deadline, priority, severity }: Ticket & { projectId: string }) => {
  return <NextLink href={`/support/${projectId}/tickets/${id}`}>
    <ButtonBase sx={{ width: "100%" }}>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography><strong>#{id}</strong> {title}</Typography>
              <Chip label="Abierto" sx={{ backgroundColor: colors.blue[600], color: "white" }} />
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

export default SupportHome;
