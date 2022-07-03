import { Card } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

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
        internos como externos
      </p>
      <p>
        Centralizar la información de los distintos procesos de manera fluida en
        una única herramienta
      </p>
      <div>
        <Link href="/rrhh">
          <a>
            <Card className={styles.HomeCard}>
              <h1>Recursos Humanos</h1>
              <ul>
                <li>Carga de horas a los proyectos.</li>
                <li>
                  Reporte de recursos utilizados por proyecto y horas dedicadas
                  a soporte.
                </li>
                <li>Gestión de recursos para cada proyecto.</li>
              </ul>
            </Card>
          </a>
        </Link>
        <Link href="/projects">
          <a>
            <Card className={styles.HomeCard}>
              <h1>Proyectos</h1>
              <ul>
                <li>Gestión de proyectos, fases, iteraciones y tareas.</li>
                <li>Gestión y visibilidad de Riesgos.</li>
                <li>Asignaciones de tareas a desarrolladores.</li>
              </ul>
            </Card>
          </a>
        </Link>
        <Link href="/support">
          <a>
            <Card className={styles.HomeCard}>
              <h1>Soporte</h1>
              <ul>
                <li>
                  Gestión de tickets, para facilitar el registro y resolución de
                  problemas
                </li>
              </ul>
            </Card>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
