import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Stack, Container } from "@mui/material";
import useSWR from "swr";
import { supportFetcher, Ticket } from "@services/support";
import TicketCard from "src/components/support/TicketCard";


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

export default SupportHome;
