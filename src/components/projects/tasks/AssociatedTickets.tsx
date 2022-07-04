import { useMemo } from "react";
import NextLink from "next/link";
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  colors,
  Box,
  ButtonBase,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Loading from "../../common/Loading";
import { useSWR } from "../../../services/requests";
import styles from "../../common/Card.module.css";
import Caption from "../../common/Caption";
import { zeroPad } from "../../../util/util";

type AssociatedTask = {
  id: number;
  taskId: number;
  ticketId: number;
};

type Ticket = {
  id: number;
  title: string;
  state: string;
  tasks: AssociatedTask[];
};

const URL = "https://squad320221c-production.up.railway.app/tickets";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const AssociatedTickets = ({ taskId }: { taskId: number }) => {
  const { data, error, isValidating } = useSWR(URL, fetcher);
  const loading = !data && isValidating;

  const tickets = useMemo(() => {
    if (!data) return [];
    return data.filter((ticket: Ticket) => {
      return ticket.tasks.some(
        (task: AssociatedTask) => task.taskId === taskId
      );
    });
  }, [data, taskId]);

  return (
    <div
      style={{
        flex: 1,
        padding: 30,
        paddingRight: 0,
      }}
    >
      <Typography variant="overline" style={{ lineHeight: "normal" }}>
        Tickets asociados
      </Typography>
      {loading && !error ? <Loading /> : null}
      {error ? (
        <Alert severity="error" style={{ width: "100%" }}>
          No se pudieron cargar los tickets asociados
        </Alert>
      ) : null}
      {tickets.map((ticket: Ticket) => (
        <a key={ticket.id}>
          <NextLink href={`/support/${ticket.id}`} passHref>
            <ButtonBase sx={{ width: "100%" }} style={{ marginTop: 10 }}>
              <Card sx={{ width: "100%" }} className={styles.hover}>
                <CardContent style={{ padding: 10 }}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        {zeroPad(ticket.id ?? 0) + " - " + ticket.title}
                      </Typography>
                      <Chip
                        label="Abierto"
                        sx={{
                          backgroundColor: colors.blue[600],
                          color: "white",
                        }}
                        size="small"
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </ButtonBase>
          </NextLink>
        </a>
      ))}
      <Caption>
        {tickets?.length === 0 && !loading && !error
          ? "No hay tickets asociados"
          : ""}
      </Caption>
    </div>
  );
};

export default AssociatedTickets;
