import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { GraficoDetails } from "../../components/graficos/grafico-details";
import { setCookie, parseCookies } from "nookies";
import api from "../../services/api";

const GraficoView = ({ data }) => {
  return (
    <>
      <Head>
        <title>Gráficos | Gestão de Condomínios</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Gráfico - Fluxo de Caixa
          </Typography>
          <Box sx={{ mt: 3 }}>
            <GraficoDetails dataGrafico={data} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
GraficoView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default GraficoView;

export async function getServerSideProps(context) {
  const { dataInicial, dataFinal } = context.query;
  const { ["gc.token"]: token } = parseCookies(context);
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  if (!token) {
    return {
      redirect: {
        destination: "/pages/login",
        permanent: false,
      },
    };
  }
  const data = await api
    .post("caixa/total-periodo", { dataInicial, dataFinal })
    .then((res) => res.data)
    .catch(() => []);
  return {
    props: { data },
  };
}
