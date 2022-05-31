import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={"page " + styles.Home}>
      <Head>
        <title>Home Page</title>
        <meta name="PSA Cloud - Spring Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Home Page</h1>
      <h2>Centralize Information</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nemo,
        tempora iure hic dolorem, soluta repellat natus sed distinctio ipsa
        labore odit magni, ut placeat.
      </p>
      <h2>Take decisions based on Data</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nemo,
        tempora iure hic dolorem, soluta repellat natus sed distinctio ipsa
        labore odit magni, ut placeat.
      </p>
      <h2>All you need in a single tool</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nemo,
        tempora iure hic dolorem, soluta repellat natus sed distinctio ipsa
        labore odit magni, ut placeat.
      </p>
    </div>
  );
};

export default Home;
