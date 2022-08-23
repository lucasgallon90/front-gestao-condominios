import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CaixaListResults } from "../components/caixa/caixa-list-results";
import { DashboardLayout } from "../components/dashboard-layout";
import { caixa } from "../__mocks__/caixa";
import { SearchToolbar } from "../components/common/search-toolbar";

const filters = [
  { label: "Descrição", value: "descricao" },
  { label: "Data", value: "createdAt" },
];

const Caixa = () => (
  <>
    <Head>
      <title>Caixa Consolidado | Gestão de Condomínios</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title="Caixa" url="caixa" filters={filters} addButtonHide />
        <Box sx={{ mt: 3 }}>
          <CaixaListResults caixa={caixa} />
        </Box>
      </Container>
    </Box>
  </>
);
Caixa.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Caixa;
