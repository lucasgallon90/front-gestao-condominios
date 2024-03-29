import { Box, Container } from "@mui/material";
import Head from "next/head";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CobrancaListResults } from "../../components/cobrancas/cobranca-list-results";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatarData } from "../../utils";

const filters = [
  { label: "Data", value: "createdAt", type: "date" },
  { label: "Descrição", value: "descricao" },
  { label: "Data Vcto.", value: "dataVencimento", type: "date" },
  { label: "Data Pgto.", value: "dataPagamento", type: "date" },
];

const Cobrancas = () => {
  const [cobrancas, setCobrancas] = useState([]);
  const [filterValue, setFilterValue] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    list();
  }, [page, limit]);

  async function list(value) {
    setLoading(true);
    let filter = null;
    if (selectedFilter && (value || filterValue))
      filter = { [selectedFilter]: value || filterValue };
    await api
      .post("cobrancas/list", filter, { params: { limit, page } })
      .then((res) => {
        setCobrancas(res.data);
        setTotalRows(Number(res.headers["x-total-count"] || 0));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

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
            url="cobrancas"
            title={"Cobranças"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="cobrancas"
            dataExport={cobrancas}
            headExport={[
              { label: "Data", key: "createdAt", format: (value) => formatarData(value) },
              { label: "Descrição", key: "descricao" },
              {
                label: "Data Vcto.",
                key: "dataVencimento",
                format: (value) => formatarData(value),
              },
              {
                label: "Data Pgto.",
                key: "dataVencimento",
                format: (value) => formatarData(value),
              },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <CobrancaListResults
              cobrancas={cobrancas}
              page={page - 1}
              setPage={setPage}
              totalRows={totalRows}
              limit={limit}
              setLimit={setLimit}
              refreshData={list}
              loading={loading}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Cobrancas.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Cobrancas;
