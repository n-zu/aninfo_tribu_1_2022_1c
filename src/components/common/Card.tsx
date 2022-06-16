import styles from "./Card.module.css";
import Link from "next/link";
import { Project, Task } from "../../services/types";
import { zeroPad } from "../../util/util";
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core";

const InfoCard = ({ info, link }: { info: Project | Task, link: string }) => {
  return (
    <Link href={link + info?.id}>
      <a className={styles.InfoCard}>
        <Card style={{padding: 0}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h4" style={{fontWeight: 700}}>
                {zeroPad(info?.id ?? 0)} - {info.name}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Inicio : {info.initial_date}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Fin : {info.final_date}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default InfoCard;
