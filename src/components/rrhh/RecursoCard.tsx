import styles from "../common/Card.module.css";
import Link from "next/link";
import { Recurso } from "../../services/types";
import { zeroPad } from "../../util/util";
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const RecursoCard = ({ info, link }: { info: Recurso, link: string }) => {
  console.log(info.legajo);
  return (
    <Link href={link + info?.legajo}>
      <a className={styles.InfoCard}>
        <Card style={{padding: 0}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h4" style={{fontWeight: 700}}>
                {zeroPad(info?.legajo ?? 0)} - {info.nombre} - {info.apellido}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Legajo : {info.legajo}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Nombre : {info.nombre}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Apellido : {info.apellido}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default RecursoCard;