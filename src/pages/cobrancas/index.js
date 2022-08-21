import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CobrancaListResults } from "../../components/cobrancas/cobranca-list-results";
import { cobrancas } from "../../__mocks__/cobrancas";
import { useState } from "react";

const filters = [
  { label: "Data", value: "createdAt" },
  { label: "Descrição", value: "descricao" },
  { label: "Data Vcto.", value: "dataVencimento" },
  { label: "Data Pgto.", value: "dataVencimento" },
];

const Cobrancas = () => {
  const [filterValue, setFilterValue] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  return (
    <>
      <Head>
        <title>Cobranças</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <SearchToolbar
            title="Cobranças"
            url="cobrancas"
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />

          <Box sx={{ mt: 3 }}>
            <CobrancaListResults cobrancas={cobrancas} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Cobrancas.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Cobrancas;
