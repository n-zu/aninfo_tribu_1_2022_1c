import useSWR from "swr";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Stack, Container, Button } from "@mui/material";
import { supportFetcher, Ticket } from "@services/support";
import TicketCard from "src/components/support/TicketCard";


const SupportHome: NextPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { data: tickets, error } = useSWR<Ticket[]>(`/tickets?versionId=${projectId}`, supportFetcher)

  return (
    <Container className="page">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>Tickets de soporte</h1>
        <NextLink href={`/support/${projectId}/tickets/create`} passHref>
          <Button variant="contained" sx={{ height: "3em" }}>+ Crear ticket</Button>
        </NextLink>
      </Stack>

      <Stack direction="column" spacing={2}>
        {tickets?.map((ticket) =>
          <TicketCard key={ticket.id} projectId={projectId as string} {...ticket} />
        )}
      </Stack>
    </Container >
  );
};

export default SupportHome;
