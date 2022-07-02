import { useMemo } from "react";
import styles from "../common/Card.module.css";
import Link from "next/link";
import { Project, Task } from "../../services/types";
import { zeroPad, dateDiff, pluralize } from "../../util/util";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import StateChip from "./StateChip";

dayjs.extend(relativeTime);

const InfoCard = ({
  info,
  link,
  children,
}: {
  info: Project | Task;
  link: string;
  children?: React.ReactNode;
}) => {
  const finishString = useMemo(() => {
    const today = new Date();
    const prefix =
      today.toISOString() > info.final_date ? "finalizado " : "finaliza ";
    return prefix + dayjs(info.final_date).locale(es).from(today);
  }, [info.final_date]);

  return (
    <Link href={link + info?.id}>
      <a className={styles.InfoCard}>
        <Card style={{ padding: 0 }}>
          <CardActionArea>
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  component="h4"
                  style={{ fontWeight: 700, textOverflow: "ellipsis" }}
                  noWrap
                >
                  {zeroPad(info?.id ?? 0)} - {info.name}
                </Typography>
                <StateChip state={info.state} />
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip
                  title={`Fecha de fin: ${info.final_date}`}
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    alignSelf: "flex-end",
                  }}
                  placement="right"
                >
                  <Typography variant="subtitle1">
                    {`Iniciado el ${info.initial_date} (${finishString})`}
                  </Typography>
                </Tooltip>
                <Box>{children}</Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default InfoCard;
