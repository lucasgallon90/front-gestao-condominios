import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { TipoMovimentacaoListResults } from "../../components/tipos-movimentacao/tipo-movimentacao-list-results";
import { tiposMovimentacao } from "../../__mocks__/tiposMovimentacao";

const TiposMovimentacao = () => (
  <>
    <Head>
      <title>Tipos de Movimentação | Gestão de Condomínios</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title={"Tipos de Movimentação"} />

        <Box sx={{ mt: 3 }}>
          <TipoMovimentacaoListResults tiposMovimentacao={tiposMovimentacao} />
        </Box>
      </Container>
    </Box>
  </>
);

TiposMovimentacao.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TiposMovimentacao;
