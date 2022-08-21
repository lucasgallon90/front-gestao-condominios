import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { MovimentacaoListResults } from "../../components/movimentacoes/movimentacao-list-results";
import { movimentacoes } from "../../__mocks__/movimentacoes";

const filters = [
  { label: "Data", value: "createdAt" },
  { label: "Descrição", value: "descricao" },
  { label: "Data Vcto.", value: "dataVencimento" },
  { label: "Data Pgto.", value: "dataVencimento" },
];

const Movimentações = () => (
  <>
    <Head>
      <title>Movimentações</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title="Movimentações" url="movimentacoes" filters={filters} />

        <Box sx={{ mt: 3 }}>
          <MovimentacaoListResults movimentacoes={movimentacoes} />
        </Box>
      </Container>
    </Box>
  </>
);

Movimentações.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Movimentações;
