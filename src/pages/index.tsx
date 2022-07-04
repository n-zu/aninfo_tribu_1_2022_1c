import { Card, Box } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SvgIcon } from "@mui/material";
//https://mui.com/material-ui/material-icons/?theme=Outlined
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={"page " + styles.Home}>
      <Head>
        <title>Home</title>
        <meta name="PSA Cloud - Spring Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>PSA - Sistema Integrado de Gestión</h1>

      <p>
        Facilitar la toma de decisiones en base a datos, tanto para procesos
        internos como externos.
      </p>
      <p>
        Centralizar la información de los distintos procesos de manera fluida en
        una única herramienta.
      </p>
      <div>
        <HomeCard
          title="Recursos humanos"
          items={[
            "Carga de horas a los proyectos",
            "Reporte de recursos utilizados por proyecto y horas dedicadas a soporte",
            "Gestión de recursos para cada proyecto",
          ]}
          href="/rrhh"
          Icon={HailOutlinedIcon}
        />
        <HomeCard
          title="Proyectos"
          items={[
            "Gestión de proyectos y tareas",
            "Asignaciones de tareas a recursos",
          ]}
          href="/projects"
          Icon={AssignmentOutlinedIcon}
        />
        <HomeCard
          title="Soporte"
          items={["Gestión de tickets"]}
          href="/support"
          Icon={BugReportOutlinedIcon}
        />
      </div>
    </div>
  );
};

type HomeCardProps = {
  title: string;
  items: string[];
  href: string;
  Icon: typeof SvgIcon;
};

const HomeCard = ({ title, items, href, Icon }: HomeCardProps) => {
  return (
    <Link href={href}>
      <a>
        <Card className={styles.HomeCard}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              minHeight: 155,
              paddingRight: "5%",
            }}
          >
            <div style={{ width: "100%" }}>
              <h1>{title}</h1>
              <ul>
                {items.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Icon sx={{ fontSize: 100, alignSelf: "center" }} />
          </Box>
        </Card>
      </a>
    </Link>
  );
};

export default Home;
