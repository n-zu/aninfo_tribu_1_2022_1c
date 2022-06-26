import { Chip, Container, Typography, colors, Divider, Box, Stack, Link } from "@mui/material";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { State, Ticket } from "../../../services/support/types";
import { AiOutlineEdit } from "react-icons/ai"
import NextLink from "next/link";

const ticket: Ticket = {
    id: 1,
    title: "ERP PSA",
    state: State.ABIERTO,
    priority: "Alto",
    severity: "S1",
    responsible: "Valentina Kelloggs",
    creationDate: dayjs("2022-6-17").locale(es),
    expirationDate: dayjs("2022-6-18").locale(es),
    lastEditionDate: dayjs("2022-6-17").locale(es),
    description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex veritatis voluptate, incidunt eum consectetur facilis voluptatem impedit amet tempore numquam dolorem suscipit vero dolorum. Aliquam sunt corporis mollitia alias autem.
    Reiciendis quasi delectus in ut dolorem neque reprehenderit nobis corrupti mollitia debitis quam non sed asperiores aperiam odit atque et recusandae molestiae aliquam, iusto ducimus! Dolore culpa maxime quibusdam eveniet.
    Culpa labore at voluptatibus exercitationem dolor provident ipsa ipsum, nam laudantium ut molestias nobis laborum itaque deleniti magnam, pariatur nisi.Atque id perspiciatis minima ipsum nostrum nam tempora quis dolor!
    Magni corrupti odio nam vero quo velit cumque provident, placeat dicta animi blanditiis, autem inventore possimus aliquam ut hic ab, esse saepe! Quo, ut tempore dignissimos dolor omnis eaque deleniti?`
};

const TicketScreen: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container className="page" >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <h1>#{id} {ticket.title}</h1>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Chip label="Abierto" sx={{ backgroundColor: colors.blue[600], color: "white", padding: "0 1em" }} />
                    <NextLink href={`/support/${id}/edit`} passHref>
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
                    <Typography>Responsable: {ticket.responsible}</Typography>
                </Stack>
                <Stack direction="column" sx={{ flex: 1, alignItems: "end" }}>
                    <Typography>Vencimiento: {ticket.expirationDate.format("DD/MM/YYYY")}</Typography>
                    <Typography>Fecha de creación: {ticket.creationDate.format("DD/MM/YYYY")}</Typography>
                    <Typography>Última edición: {ticket.lastEditionDate.format("DD/MM/YYYY")}</Typography>
                </Stack>
            </Stack>

            <Divider sx={{ margin: "1em 0" }} />

            <Box sx={{ border: '0.75px solid grey', borderRadius: "5px", padding: "1em" }}>
                <Typography>{ticket.description}</Typography>
            </Box>

        </Container>
    );
};

export default TicketScreen;