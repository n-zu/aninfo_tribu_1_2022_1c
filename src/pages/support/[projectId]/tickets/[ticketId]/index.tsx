import {
  Chip,
  Container,
  Typography,
  colors,
  Divider,
  Box,
  Stack,
  Link,
} from "@mui/material";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import useSWR from "swr";
import { supportFetcher, Ticket } from "@services/support";
import { useRecursos } from "@services/rrhh";

const TicketScreen: NextPage = () => {
  const router = useRouter();
  const { projectId, ticketId } = router.query;
  const { data: ticket, error } = useSWR<Ticket>(
    `/tickets/${ticketId}`,
    supportFetcher
  );

  return (
    <Container className="page">
      {ticket !== undefined && (
        <CustomComponent ticket={ticket} projectId={projectId as string} />
      )}
    </Container>
  );
};

const CustomComponent = ({
  ticket,
  projectId,
}: {
  ticket: Ticket;
  projectId: string;
}) => {
  const { recursos, error: employeesError } = useRecursos();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>
          #{ticket.id} {ticket.title}
        </h1>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Chip
            label="Abierto"
            sx={{
              backgroundColor: colors.blue[600],
              color: "white",
              padding: "0 1em",
            }}
          />
          <NextLink
            href={`/support/${projectId}/tickets/${ticket.id}/edit`}
            passHref
          >
            <Link>
              <AiOutlineEdit size={25} />
            </Link>
          </NextLink>
        </Stack>
      </Stack>

      <Stack direction="row">
        <Stack direction="column" sx={{ flex: 1 }}>
          <Typography>Severidad: {ticket.severity}</Typography>
          <Typography>Prioridad: {ticket.priority}</Typography>
          <Typography>
            Responsable/s:{" "}
            {ticket.employees.map((employeeId) => {
              const recurso = recursos?.find((r) => r.id == employeeId);
              return recurso ? (
                <Chip
                  key={employeeId}
                  label={`${recurso?.name} ${recurso?.lastname}`}
                />
              ) : undefined;
            })}
          </Typography>
        </Stack>
        <Stack direction="column" sx={{ flex: 1, alignItems: "end" }}>
          <Typography>
            Vencimiento: {dayjs(ticket.deadline).format("DD/MM/YYYY")}
          </Typography>
          <Typography>
            Fecha de creación: {dayjs(ticket.creationDate).format("DD/MM/YYYY")}
          </Typography>
          <Typography>
            Última edición: {dayjs().format("DD/MM/YYYY")}
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ margin: "1em 0" }} />

      <Box
        sx={{
          border: "0.75px solid grey",
          borderRadius: "5px",
          padding: "1em",
        }}
      >
        <Typography>{ticket.description}</Typography>
      </Box>
    </>
  );
};

export default TicketScreen;
