import {
  Container,
  Typography,
  Divider,
  Box,
  Stack,
  TextField,
  Button,
  FormLabel,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  Input,
} from "@mui/material";
import { useRecursos } from "@services/rrhh";
import { postHeaders, supportFetcher, Ticket } from "@services/support";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import ResponsablePicker from "src/components/support/ResponsablePicker";
import TasksPicker from "src/components/support/TasksPicker";
import TicketStatusChip from "src/components/support/TicketStatusChip";
import { Client } from "@services/types";

const metadata = {
  severities: ["s1", "s2", "s3", "s4", "s5"].reverse(),
  priorities: ["Baja", "Media", "Alta"],
};

const TicketEditScreen: NextPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as any as string;
  const ticketId = router.query.ticketId as any as string;


  console.log({ ticketId });

  const { data: ticket, error } = useSWR<Ticket>(
    `/tickets/${ticketId}`,
    supportFetcher
  );
  const { recursos, error: employeesError } = useRecursos();
  const {data: client} = useSWR<Client>(`/clients/${ticket?.clientId}`, (resource: string) => supportFetcher(resource).catch(err => "-"))

  const [tasks, setTasks] = useState(ticket?.tasks ?? [])
  const [responsables, setResponsables] = useState(ticket?.employees ?? [])
  const [status, setStatus] = useState(ticket?.state ?? "")

  return (
    <Container className="page">
      {recursos && ticket && (
        <Formik
          initialValues={ticket}
          validate={(values) => {
            const errors: any = {};
            const require = (field: keyof Ticket) => {
              if (!values[field]) errors[field] = "Requerido";
            };

            require("title");
            require("description");
            require("deadline");
            require("priority");
            require("severity");
            require("state");
            return errors;
          }}
          onSubmit={(values) => {
            const body = {
              ...values,
              employees: responsables,
              tasks: tasks,
              state: status,
              deadline: dayjs(values.deadline).toISOString(),
            };

            supportFetcher(`/tickets/${ticketId}`, {
              method: "PUT",
              headers: postHeaders,
              body: JSON.stringify(body),
            })
              .then(() => {
                toast.success("Cambios guardados");
                router.push(`/support/${projectId}/tickets/${ticketId}`);
              })
              .catch((err) => {
                console.error(err);
                toast.error(
                  "Ha ocurrido un error, por favor intente nuevamente mas tarde"
                );
              });
          }}
        >
          <Form>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <h1>#{ticket.id}</h1>
                <Field
                  name="title"
                  as={TextField}
                  variant="standard"
                  InputProps={{ sx: { fontSize: "2em" } }}
                />
              </Stack>

              <Select
                value={status}
                onChange={e => {
                  setStatus(e.target.value)
                }}
                input={<Input />}
                renderValue={(selected) => <TicketStatusChip label={status} />}
                disableUnderline
              >
                {["Abierto", "Cerrado", "En Progreso"].map(
                  (statusLabel) => (
                    <MenuItem key={statusLabel} value={statusLabel}>
                      <TicketStatusChip label={statusLabel} />
                    </MenuItem>
                  )
                )}
              </Select>
            </Stack>

            <Stack direction="row">
              <Stack direction="column" sx={{ flex: 1 }}>
                <Typography>Cliente: {client?.["razon social"] ?? "-"}</Typography>
                <CustomSelect
                  id="severity"
                  label="Severidad:"
                  options={metadata.severities}
                />
                <CustomSelect
                  id="priority"
                  label="Prioridad:"
                  options={metadata.priorities}
                />
                <ResponsablePicker ticket={ticket} responsables={responsables} setResponsables={setResponsables} />
                <TasksPicker ticket={ticket} tasks={tasks} setTasks={setTasks} />

              </Stack>
              <Stack direction="column" sx={{ flex: 1, alignItems: "end" }}>
                <CustomDatePicker id="deadline" label="Vencimiento:" />
                <Typography>
                  Fecha de creación:{" "}
                  {dayjs(ticket.creationDate).format("DD/MM/YYYY")}
                </Typography>
                <Typography>
                  Última edición:{" "}
                  {dayjs(ticket.lastEditionDate).format("DD/MM/YYYY")}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ margin: "1em 0" }} />

            <Field
              name="description"
              as={TextField}
              fullWidth
              multiline
              minRows={10}
            ></Field>

            <Box>
              <Button type="submit">Guardar</Button>
            </Box>
          </Form>
        </Formik>
      )}
    </Container>
  );
};

export default TicketEditScreen;

// CustomComponents

type CustomProps = {
  label: string;
  options: string[];
  id?: string;
};
const CustomSelect: FunctionComponent<CustomProps> = ({
  id,
  label,
  options,
}) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <FormLabel htmlFor={id ?? label}>{label}</FormLabel>
    <Box>
      <Field name={id ?? label} as={Select} variant="standard">
        {options.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage name={id ?? label} />
    </Box>
  </Stack>
);

const CustomDatePicker: FunctionComponent<Omit<CustomProps, "options">> = ({
  id,
  label,
}) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <FormLabel htmlFor={id ?? label}>{label}</FormLabel>
    <Box>
      <Field name={id ?? label}>
        {({ field }: { [x: string]: any }) => {
          return (
            <TextField
              variant="standard"
              type="date"
              {...field}
              value={dayjs(field.value).format("YYYY-MM-DD")}
            />
          );
        }}
      </Field>
      <ErrorMessage name={id ?? label} />
    </Box>
  </Stack>
);
