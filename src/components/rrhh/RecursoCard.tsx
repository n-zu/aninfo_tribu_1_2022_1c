import styles from "../common/Card.module.css";
import Link from "next/link";
import { Recurso } from "../../services/types";
import { zeroPad } from "../../util/util";
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const RecursoCard = ({ info, link }: { info: Recurso, link: string }) => {
  
  return (
    <Link href={link + info?.id}>
      <a className={styles.InfoCard}>
        <Card style={{padding: 0}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h4" style={{fontWeight: 700}}>
                {zeroPad(info?.id ?? 0)} - {info?.name} - {info?.lastname}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Legajo : {info?.id}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Nombre : {info?.name}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>
                Apellido : {info?.lastname}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default RecursoCard;