import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { GraficoDetails } from "src/components/graficos/grafico-details";

const GraficoView = ({ operation, id }) => (
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
          <GraficoDetails />
        </Box>
      </Container>
    </Box>
  </>
);
GraficoView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default GraficoView;
