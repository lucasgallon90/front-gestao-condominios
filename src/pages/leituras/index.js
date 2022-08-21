import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { LeituraListResults } from "../../components/leituras/leitura-list-results";
import { leituras } from "../../__mocks__/leituras";

const filters = [
  { label: "Morador", value: "nomeMorador" },
  { label: "Mês/Ano", value: "mesAno", type: "mesAno" },
  { label: "Tipo Leitura", value: "tipoLeitura" },
];

const Leituras = () => (
  <>
    <Head>
      <title>Leituras</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title={"Leituras"} filters={filters} />
        <Box sx={{ mt: 3 }}>
          <LeituraListResults leituras={leituras} url="leituras" />
        </Box>
      </Container>
    </Box>
  </>
);

Leituras.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Leituras;
