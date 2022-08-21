import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useState, useEffect } from "react";
import { TipoMovimentacaoDetails } from "src/components/tipos-movimentacao/tipo-movimentacao-details";

const TipoMovimentacao = ({ operation, id }) => (
  <>
    <Head>
      <title>Cadastro de Tipos de Movimentação | Gestão de Condomínios</title>
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
          {operation == "view" && "Consulta"} - Tipo de Movimentação
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TipoMovimentacaoDetails operation={operation} id={id} onlyView={operation == "view"} />
        </Box>
      </Container>
    </Box>
  </>
);
TipoMovimentacao.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TipoMovimentacao;

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
