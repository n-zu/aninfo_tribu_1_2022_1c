import styles from "./Card.module.css";
import Link from "next/link";
import { Project, Task } from "../../services/types";
import { zeroPad, dateDiff } from "../../util/util";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Tooltip,
} from "@material-ui/core";

const InfoCard = ({
  info,
  link,
  children,
}: {
  info: Project | Task;
  link: string;
  children?: React.ReactNode;
}) => {
  let daysToEnd = dateDiff(new Date(info.final_date), new Date());

  let finishString = "";
  if (daysToEnd > 0) finishString = `${daysToEnd} días restantes`;
  else finishString = `finalizado hace ${Math.abs(daysToEnd)} días`;

  return (
    <Link href={link + info?.id}>
      <a className={styles.InfoCard}>
        <Card style={{ padding: 0 }}>
          <CardActionArea>
            <CardContent>
              <Typography
                variant="h6"
                component="h4"
                style={{ fontWeight: 700 }}
              >
                {zeroPad(info?.id ?? 0)} - {info.name}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip
                  title={`End date: ${info.final_date}`}
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
