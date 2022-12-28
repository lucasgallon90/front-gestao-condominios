import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { TipoMovimentacaoListResults } from "../../components/tipos-movimentacao/tipo-movimentacao-list-results";
import api from "../../services/api";

const filters = [
  { label: "Descrição", value: "descricao" },
  { label: "Tipo", value: "tipo" },
];

const TiposMovimentacao = () => {
  const [tiposMovimentacao, setTiposMovimentacao] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
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
      .post("tipos-movimentacao/list", filter, { params: { limit, page } })
      .then((res) => {
        setTiposMovimentacao(res.data);
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
          <SearchToolbar
            url="tipos-movimentacao"
            title={"Tipos de Movimentação"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="tipos-movimentacao"
            dataExport={tiposMovimentacao}
            headExport={[
              { label: "Descrição", key: "descricao" },
              {
                label: "Tipo",
                key: "tipo",
                format: (value) => (value === "E" ? "Entrada" : "Saída"),
              },
              {
                label: "Gera cobrança",
                key: "gerarCobranca",
                format: (value) => (value ? "Sim" : "Não"),
              },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <TipoMovimentacaoListResults
              tiposMovimentacao={tiposMovimentacao}
              page={page - 1}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalRows={totalRows}
              refreshData={list}
              loading={loading}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

TiposMovimentacao.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TiposMovimentacao;
