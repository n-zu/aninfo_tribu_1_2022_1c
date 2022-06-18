import { Card, CardContent, Chip, Divider, Stack, Typography, colors, Box, Container, Link } from "@mui/material";
import type { NextPage } from "next";
import NextLink, { LinkProps } from "next/link"
import dayjs from "dayjs";
import es from "dayjs/locale/es"
import relativeTime from "dayjs/plugin/relativeTime"
import React from "react";

type TicketSummary = {
  id: number,
  title: String,
  priority: String,
  severity: String,
  expiration: dayjs.Dayjs,
}

const tickets: TicketSummary[] = [
  {
    id: 1,
    title: "ERP PSA",
    expiration: dayjs("2022-6-18").locale(es),
    priority: "Alto",
    severity: "S1"
  }
];

dayjs.extend(relativeTime)

const CustomNextLink = ({ href, content }: { href: string, content: any }) => (
  <NextLink href={href} passHref>
    <Link
      underline="hover"
      color="inherit"
    >
      {content}
    </Link>
  </NextLink>
)

const TicketCard = ({ id, title, expiration, priority, severity }: TicketSummary) => (
  <Card>
    <CardContent>
      <Box sx={{ paddingRight: "1em" }}>
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
)

const Home: NextPage = () => {

  return (
    <Container className="page">
      <h1>Tickets de soporte</h1>
      {tickets.map((ticket) =>
        <TicketCard key={ticket.id} {...ticket} />
      )}
    </Container >
  );
};

export default Home;
