import { Box, Container } from "@mui/material";
import Head from "next/head";
import { TiposLeituraListResults } from "../components/tipos-leitura/tipos-leitura-list-results";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { tiposLeitura } from "../../__mocks__/tiposLeitura";


const TiposLeitura = () => (
  <>
    <Head>
      <title>Tipos de Leitura | Gestão de Condomínios</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SearchToolbar title={"Tipos de Leitura"} />

        <Box sx={{ mt: 3 }}>
          <TiposLeituraListResults tiposLeitura={tiposLeitura} />
        </Box>
      </Container>
    </Box>
  </>
);

TiposLeitura.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TiposLeitura;
