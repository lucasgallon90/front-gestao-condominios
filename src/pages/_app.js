import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from 'date-fns/locale/pt-BR';
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import AuthContext from "../contexts/authContext";
import { theme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, initialState = {} } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Gestão de Condomínios</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Toaster
          position="top-right"
          toastOptions={{
            error: {
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />

        <ThemeProvider theme={theme}>
          <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <AuthContext>{getLayout(<Component {...pageProps} />)}</AuthContext>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
  );
};

export default App;
