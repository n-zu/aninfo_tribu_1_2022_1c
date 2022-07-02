import type { NextPage } from "next";
import { State, TicketSummary } from "@services/support/types";
import NextLink from "next/link"
import dayjs from "dayjs";
import es from "dayjs/locale/es"
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from "next/router";
import { Card, CardContent, Chip, Divider, Stack, Typography, colors, Box, Container, ButtonBase, Button } from "@mui/material";

const tickets: TicketSummary[] = [
  {
    id: 1,
    title: "ERP PSA",
    state: State.ABIERTO,
    expirationDate: dayjs("2022-6-18").locale(es),
    priority: "Alto",
    severity: "S1"
  }
];

dayjs.extend(relativeTime)

const TicketCard = ({ id, title, expirationDate: expiration, priority, severity }: TicketSummary) => {
  const router = useRouter();
  const { projectId } = router.query;

  console.log(projectId)

  return <NextLink href={`/support/${projectId}/tickets/${id}`} passHref>
    <ButtonBase sx={{ width: "100%" }}>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography>{title}</Typography>
              <Chip label="Abierto" sx={{ backgroundColor: colors.blue[600], color: "white" }} />
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Typography>Vence en: {expiration.fromNow()}</Typography>
            <Typography>Prioridad: {priority}</Typography>
            <Typography>Severidad: {severity}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </ButtonBase>
  </NextLink>
}

const SupportHome: NextPage = () => {

  return (
    <Container className="page">
      <h1>Tickets de soporte</h1>
      {tickets.map((ticket) =>
        <TicketCard key={ticket.id} {...ticket} />
      )}
    </Container >
  );
};

export default SupportHome;
