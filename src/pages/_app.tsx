import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

// React toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import "../styles/globals.css";
import Navbar from "../components/navigation/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
