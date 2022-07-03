import { Chip, Container, Typography, Divider, Box, Stack, TextField, Button, FormLabel, Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { State } from "@services/support/types";

const ticket = {
    id: 1,
    title: "ERP PSA",
    state: State.ABIERTO,
    priority: "Alto",
    severity: "S1",
    responsible: "Valentina Kelloggs",
    creationDate: "2022-06-17",
    expirationDate: "2022-06-18",
    lastEditionDate: "2022-06-17",
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex veritatis voluptate, incidunt eum consectetur facilis voluptatem impedit amet tempore numquam dolorem suscipit vero dolorum. Aliquam sunt corporis mollitia alias autem.
Reiciendis quasi delectus in ut dolorem neque reprehenderit nobis corrupti mollitia debitis quam non sed asperiores aperiam odit atque et recusandae molestiae aliquam, iusto ducimus! Dolore culpa maxime quibusdam eveniet.
Culpa labore at voluptatibus exercitationem dolor provident ipsa ipsum, nam laudantium ut molestias nobis laborum itaque deleniti magnam, pariatur nisi.Atque id perspiciatis minima ipsum nostrum nam tempora quis dolor!
Magni corrupti odio nam vero quo velit cumque provident, placeat dicta animi blanditiis, autem inventore possimus aliquam ut hic ab, esse saepe! Quo, ut tempore dignissimos dolor omnis eaque deleniti?`
};

const metadata = {
    severities: ["S1", "S2", "S3", "S4", "S5"].reverse(),
    priorities: ["Bajo", "Medio", "Alto"],
}

const responsibleOptions = ["Valentina Kelloggs", "Juan Ceo"]

const TicketEditScreen: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container className="page" >
            <Formik
                initialValues={ticket}
                onSubmit={
                    (values) => {
                        console.log(values);
                    }
                }
            >
                <Form>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <h1>#{id}</h1>
                            <Field name="title" as={TextField} variant="standard" InputProps={{sx: {fontSize: "2em"}}} />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <Stack direction="column" sx={{ flex: 1 }}>
                            <CustomSelect id="severity" label="Severidad:" options={metadata.severities} />
                            <CustomSelect id="priority" label="Prioridad:" options={metadata.priorities} />
                            <Typography>Responsable: {ticket.responsible}</Typography>
                        </Stack>
                        <Stack direction="column" sx={{ flex: 1, alignItems: "end" }}>
                            <CustomDatePicker id="expirationDate" label="Vencimiento:" />
                            <Typography>Fecha de creación: {dayjs(ticket.creationDate).format("DD/MM/YYYY")}</Typography>
                            <Typography>Última edición: {dayjs(ticket.lastEditionDate).format("DD/MM/YYYY")}</Typography>
                        </Stack>
                    </Stack>

                    <Divider sx={{ margin: "1em 0" }} />

                    <Field name="description" as={TextField} fullWidth multiline minRows={10}></Field>

                    <Box>
                        <Button type="submit">Guardar</Button>
                    </Box>
                </Form>
            </Formik>

        </Container>
    );
};

export default TicketEditScreen;


// CustomComponents

type CustomProps = {
    label: string,
    options: string[],
    id?: string,
}
const CustomSelect: FunctionComponent<CustomProps> = ({ id, label, options }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
        <FormLabel htmlFor={id ?? label}>{label}</FormLabel>
        <Field name={id ?? label} as={Select} variant="standard">
            {options.map((val) => (
                <MenuItem key={val} value={val}>{val}</MenuItem>
            ))}
        </Field>
    </Stack>
)

const CustomDatePicker: FunctionComponent<Omit<CustomProps, "options">> = ({ id, label }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
        <FormLabel htmlFor={id ?? label}>{label}</FormLabel>
        <Field name={id ?? label} type="date" as={TextField} variant="standard" />
    </Stack>
)