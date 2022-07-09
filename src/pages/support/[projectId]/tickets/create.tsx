import {
  Container,
  Divider,
  Box,
  Stack,
  TextField,
  Button,
  FormLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  Autocomplete,
} from "@mui/material";
import { useRecursos } from "@services/rrhh";
import { postHeaders, psaExternalFetcher, supportFetcher, Ticket } from "@services/support";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import TasksPicker from "src/components/support/TasksPicker";
import ResponsablePicker from "src/components/support/ResponsablePicker";
import React, { useEffect } from "react";
import { AiOutlineHourglass } from "react-icons/ai";
import { Client, Recurso } from "@services/types";
import { zeroPad } from "src/util/util";


const metadata = {
  severities: ["s1", "s2", "s3", "s4", "s5"].reverse(),
  priorities: ["Baja", "Media", "Alta"],
};

const TicketEditScreen: NextPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as any as string;
  const [tasks, setTasks] = useState([])
  const [responsables, setResponsables] = useState([])
  // const [clients, setClients] = useState([])
  const {data: clients} = useSWR<Client[]>("/clients", supportFetcher);
  const [client, setClient] = useState<number | null>(null)

  const ticket = {
    id: null,
    title: "Ticket Title",
    description: "Ticket description.",
    deadline: "",
    priority: "",
    severity: "",
    employees: responsables,
    tasks: tasks,
    clientId: client,
    versionId: projectId,
  };

  const { recursos, error: employeesError } = useRecursos();

  return (
    <Container className="page">
      {recursos && ticket && (
        <Formik
          initialValues={ticket}
          validate={(values: any) => {
            const errors: any = {};
            const require = (field: keyof Ticket) => {
              if (!values[field]) errors[field] = "Requerido";
              if (responsables.length <= 0) errors["employees"] = "Se debe asignar al menos un responsable";
              if (!client)  errors["clientId"] = "Se debe asignar un cliente";
            };

            
            require("title");
            require("employees");
            require("deadline");
            require("priority");
            require("severity");
            require("tasks");
            
            return errors;
          }}
          onSubmit={(values) => {
            
            const body = {
              ...values,
              employees: responsables,
              clientId: 1,
              tasks: tasks,
              deadline: dayjs(values.deadline).toISOString(),
            };
            supportFetcher(`/tickets/`, {
              method: "POST",
              headers: postHeaders,
              body: JSON.stringify(body),
            })
              .then(() => {
                toast.success("Cambios guardados");
                router.push(`/support`);
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
                <Field
                  name="title"
                  as={TextField}
                  variant="standard"
                  InputProps={{ sx: { fontSize: "2em" } }}
                />
                  
              </Stack>
            </Stack>
            <ErrorMessage name={"title"}>
                      { msg => <div style={{ color: 'red' }}>Se debe colocar un título</div> }
            </ErrorMessage>
            
            <Stack direction="column" sx={{ flex: 1, marginTop: 2 }}>
                <CustomDatePicker id="deadline" label="Vencimiento:" />
            </Stack>

            <Stack direction="row" style={{marginTop: 20}}>
              <Stack direction="column" sx={{ flex: 1 }}>
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

              

                <Stack direction="row" style={{marginTop: 10}}>
                  <ResponsablePicker ticket={ticket}  responsables={responsables} setResponsables={setResponsables}/>
                  <ErrorMessage name={"employees"}>
                      { msg => <div style={{ color: 'red', marginLeft: 20, marginTop: 10 }}>{msg}</div> }
                  </ErrorMessage>
                </Stack>
                <Stack direction="row" style={{marginTop: 10}}>
                  <TasksPicker ticket={ticket}  tasks={tasks} setTasks={setTasks}/>
                </Stack>
                

                
               <Autocomplete
                options={(clients as Client[]) ?? []}
                onChange={(event: any, newOption: Client | null) => {
                  newOption  ? setClient(newOption.id!) : setClient(newOption)
                  console.log(client)
                }}
                sx={{ width: 500, marginTop: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label={"Cliente"} />
                )}
                getOptionLabel={(option) =>
                  zeroPad(option?.id ?? 0) + " - " + option?.["razon social"] ?? ""
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <ErrorMessage name={"clientId"}>
                      { msg => <div style={{ color: 'red' }}>Se debe asignar un cliente</div> }
              </ErrorMessage>
                

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
    </Box>
    <ErrorMessage name={id ?? label}>
        { msg => <div style={{ color: 'red', marginLeft: 20 }}>{msg}</div> }
    </ErrorMessage>
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
      <ErrorMessage name={id ?? label}>
        { msg => <div style={{ color: 'red' }}>{msg}</div> }
      </ErrorMessage>
    </Box>
  </Stack>
);
