import Head from "next/head";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import { PerfilDetalhes } from "../components/perfil/perfil-detalhes";
import { DashboardLayout } from "../components/dashboard-layout";
import { SettingsPassword } from "../components/settings/settings-password";

const MeuPerfil = () => (
  <>
    <Head>
      <title>Meu Perfil | Gestão de Condomínios</title>
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
          Meu Perfil
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Divider />
            <PerfilDetalhes />
          </Grid>
        </Grid>
        <SettingsPassword />
      </Container>
    </Box>
  </>
);

MeuPerfil.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MeuPerfil;
