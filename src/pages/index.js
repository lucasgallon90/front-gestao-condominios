import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";
import { parseCookies } from "nookies";
import { TotalCondominios } from "../components/dashboard/total-condominios";
import { TotalUsuarios } from "../components/dashboard/total-usuarios";
import { DashboardLayout } from "../components/dashboard-layout";
import { SaldoDeCaixa } from "../components/dashboard/total-caixa";
import { TotalEntradas } from "../components/dashboard/total-entradas";
import { TotalOcorrencias } from "../components/dashboard/total-ocorrencias";
import { TotalSaidas } from "../components/dashboard/total-saidas";
import { UltimasOcorrencias } from "../components/dashboard/ultimas-ocorrencias";
import { useUser } from "../contexts/authContext";
import nookies from "nookies";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>Dashboard | Gestão de Condomínios</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {user?.tipoUsuario === "admin" && (
              <>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalEntradas/>
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalSaidas/>
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <SaldoDeCaixa/>
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalOcorrencias sx={{ height: "100%" }} />
                </Grid>
              </>
            )}
            {user?.tipoUsuario === "superAdmin" && (
              <>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalCondominios />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalUsuarios />
                </Grid>
              </>
            )}
            {(user?.tipoUsuario === "admin" || user?.tipoUsuario === "morador") && (
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <UltimasOcorrencias />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  if (query?.oauthtoken) {
    nookies.set(ctx, "gc.token", query?.oauthtoken, {
      maxAge: 86400,
      path: "/",
    });
    return {
      props: {},
    };
  }
  const { ["gc.token"]: token } = parseCookies(ctx);
  // api.get("auth/authenticate", { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
  //   if(res.data?.refreshToken){
  //     nookies.set(ctx, 'gc.token', res.data?.refreshToken, {
  //       maxAge: 86400,
  //       path: '/',
  //     })
  //   }
  // }).catch((error)=>console.log(error))
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
