import styles from "../../common/Card.module.css";
import Link from "next/link";

import { Card, CardActionArea, CardContent, Typography }  from '@mui/material';
import { zeroPad } from "../../../util/util";
import { RegistroDeHoras } from "../../../services/types";
import { useProject, useTask } from "../../../services/projects";
import { useRecurso } from "../../../services/rrhh";

const RegistroCard = ({ info, link }: { info: RegistroDeHoras | null, link: string }) => {
 
  return (
    <Link href={link + info?.id_registro_horas}>
      <a className={styles.InfoCard}>
        <Card style={{padding: 0}}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h4" style={{fontWeight: 700}}>
                  <b>Registro ID: </b> {zeroPad(info?.id_registro_horas ?? 0)}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}><b>Proyecto: </b> {useProject(info?.id_proyecto as unknown as string).project?.name}</Typography>
              <Typography variant="body1" style={{margin: 10}}><b>Tarea: </b> {useTask(info?.id_tarea as unknown as string).task?.name}</Typography>
              <Typography variant="body1" style={{margin: 10}}><b>Recurso: </b>
                {useRecurso(info?.id_recurso as unknown as string).recurso?.name + " " + useRecurso(info?.id_recurso as unknown as string).recurso?.lastname}
              </Typography>
              <Typography variant="body1" style={{margin: 10}}><b>Fecha:</b> {info?.fecha_trabajada.toString()}</Typography>
              <Typography variant="body1" style={{margin: 10}}><b>Cantidad:</b> {info?.cantidad.toString()}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
    </Link>
  );
};

export default RegistroCard;