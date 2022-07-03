import styles from "../../common/Card.module.css";
import Link from "next/link";

import { Card, CardActionArea, CardContent, Typography }  from '@mui/material';
import { zeroPad } from "../../../util/util";
import { RegistroDeHoras } from "../../../services/types";

const RegistroCard = ({ info, link }: { info: RegistroDeHoras | null, link: string }) => {
 
  return (
    <Link href={link + info?.id_registro_horas}>
      <a className={styles.InfoCard}>
        <Card style={{padding: 0}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h4" style={{fontWeight: 700}}>
                  {zeroPad(info?.id_registro_horas ?? 0)}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}>Proyecto: {info?.nombre_proyecto}</Typography>
              <Typography variant="body1" style={{margin: 10}}>Tarea: {info?.nombre_tarea}</Typography>
              <Typography variant="body1" style={{margin: 10}}>Recurso: {info?.nombre_recurso}</Typography>
              <Typography variant="body1" style={{margin: 10}}>Fecha: {info?.fecha_trabajada.toString()}</Typography>
              <Typography variant="body1" style={{margin: 10}}>Cantidad: {info?.cantidad.toString()}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default RegistroCard;