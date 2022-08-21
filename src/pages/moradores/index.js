import Head from "next/head";
import { Box, Container } from "@mui/material";
import { MoradorListResults } from "../../components/moradores/morador-list-results";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { moradores } from "../../__mocks__/moradores";

const filters = [
  { label: "Nome", value: "nome" },
  { label: "Apto", value: "apto" },
  { label: "Bloco", value: "bloco" },
  { label: "Email", value: "email", type:"email" },
];

const Moradores = () => (
  <>
    <Head>
      <title>Moradores | Gestão de Condomínios</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title="Moradores" url="moradores" filters={filters} />

        <Box sx={{ mt: 3 }}>
          <MoradorListResults moradores={moradores} />
        </Box>
      </Container>
    </Box>
  </>
);
Moradores.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Moradores;
