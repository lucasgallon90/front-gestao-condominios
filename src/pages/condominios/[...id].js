import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { CondominioDetails } from "src/components/condominios/condominio-details";

const Condominio = ({ operation, id }) => (
  <>
    <Head>
      <title>Cadastro de Condomínios | Gestão de Condomínios</title>
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
          {operation == "add" && "Novo"}
          {operation == "edit" && "Edição"}
          {operation == "view" && "Consulta"}- Condomínio
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CondominioDetails operation={operation} id={id} onlyView={operation == "view"} />
        </Box>
      </Container>
    </Box>
  </>
);
Condominio.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Condominio;

export async function getServerSideProps({ params }) {
  if (
    params.id?.length > 2 ||
    (params.id[0] != "edit" && params.id[0] != "add" && params.id[0] != "view")
  ) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  let props = {
    operation: params.id[0],
  };
  params.id?.length > 1 && (props.id = params.id[1]);
  return { props };
}
