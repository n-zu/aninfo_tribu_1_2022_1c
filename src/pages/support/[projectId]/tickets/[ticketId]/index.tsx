import {
  Chip,
  Container,
  Typography,
  colors,
  Divider,
  Box,
  Stack,
  Link,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import useSWR from "swr";
import { Employee, supportFetcher, Ticket, postHeaders } from "@services/support";
import { useRecursos } from "@services/rrhh";
import EmployeeList from "src/components/common/EmployeeList";
import { EmployeeId } from "src/services/types";
import TasksPicker from "src/components/support/TasksPicker";
import ResponsablePicker from "src/components/support/ResponsablePicker";
import TicketStatusChip from "src/components/support/TicketStatusChip";
import { useState } from "react";


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

const saveHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const supportAPIUrl = "https://squad320221c-production.up.railway.app";

const addResponsable = async (colabId: number, ticketId: number) => {
  console.log(
    "delete path: " + `/tickets/${ticketId}/employees?employee_id=${colabId}`
  );
  return await fetch(
    supportAPIUrl + `/tickets/${ticketId}/employees?employee_id=${colabId}`,
    {
      method: "POST",
      headers: saveHeaders,
    }
  );
};

export const deleteResponsable = async (colabId: number, ticketId: number) => {
  console.log(
    "delete path: " + `/tickets/${ticketId}/employees?employee_id=${colabId}`
  );
  return await fetch(
    supportAPIUrl + `/tickets/${ticketId}/employees?employee_id=${colabId}`,
    {
      method: "DELETE",
      headers: saveHeaders,
    }
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

  const client = ticket.clientId ? useSWR<Ticket>(`/clients/${ticket.clientId}`,supportFetcher).data : "-"

  const currentEmployees: EmployeeId[] = ticket?.employees.map((employee) => {
    let ids: EmployeeId = { id: employee };
    return ids;
  });

  const addRes = (colabId: number) => {
    addResponsable(colabId, ticket.id);
  };

  const deleteRes = (colabId: number) => {
    deleteResponsable(colabId, ticket.id);
  };

  const [tasks, setTasks] = useState(ticket?.tasks ?? [])
  const [responsables, setResponsables] = useState(ticket?.employees ?? [])
  const [status, setStatus] = useState(ticket.state)
  

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>
          #{ticket.id} {ticket.title}
        </h1>
        <Stack direction="row" alignItems="center" spacing={2}>

        <TicketStatusChip label={ticket.state} />
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
          <Typography>Cliente: {client ? client["razon social"] : "-"}</Typography>
          <Typography>Severidad: {ticket.severity}</Typography>
          <Typography>Prioridad: {ticket.priority}</Typography>
          <ResponsablePicker ticket={ticket}  responsables={responsables} setResponsables={setResponsables}/>
          <TasksPicker ticket={ticket}  tasks={tasks} setTasks={setTasks}/>
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
