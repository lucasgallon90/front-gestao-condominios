import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { GraficoOptions } from "../../components/graficos/grafico-options";

const Graficos = () => (
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
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Gráficos
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Divider />
            <GraficoOptions />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Graficos.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Graficos;
