import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CondominioListResults } from "../../components/condominios/condominio-list-results";
import { condominios } from "../../__mocks__/condominios";

const filters = [
  { label: "Nome", value: "nome" },
  { label: "Endereço", value: "endereco" },
  { label: "Cidade", value: "cidade" },
  { label: "UF", value: "uf" },
];

const Condominios = () => (
  <>
    <Head>
      <title>Condominios</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title="Condomínios" url="condominios" filters={filters} />

        <Box sx={{ mt: 3 }}>
          <CondominioListResults condominios={condominios} />
        </Box>
      </Container>
    </Box>
  </>
);

Condominios.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Condominios;
