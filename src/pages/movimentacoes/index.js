import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { MovimentacaoListResults } from "../../components/movimentacoes/movimentacao-list-results";
import api from "../../services/api";

const filters = [
  { label: "Data", value: "createdAt", type:"date" },
  { label: "Descrição", value: "descricao" },
  { label: "Data Vcto.", value: "dataVencimento", type:"date" },
  { label: "Data Pgto.", value: "dataPagamento", type:"date" },
];

const Movimentações = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [filterValue, setFilterValue] = useState("");
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
      .post("movimentacoes/list", filter, { params: { limit, page } })
      .then((res) => {
        setMovimentacoes(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
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
          <SearchToolbar
            url="movimentacoes"
            title={"Movimentações"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="movimentacoes"
            dataExport={movimentacoes}
            headExport={[
              {
                label: "Data",
                key: "createdAt",
                format: (value) => format(new Date(value), "dd/MM/yy"),
              },
              { label: "Descrição", key: "descricao" },
              {
                label: "Data Vcto.",
                key: "dataVencimento",
                format: (value) => format(new Date(value), "dd/MM/yy"),
              },
              {
                label: "Data Pgto.",
                key: "dataVencimento",
                format: (value) => format(new Date(value), "dd/MM/yy"),
              },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <MovimentacaoListResults
              movimentacoes={movimentacoes}
              page={page - 1}
              setPage={setPage}
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

Movimentações.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Movimentações;
