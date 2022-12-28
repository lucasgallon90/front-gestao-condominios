import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CaixaListResults } from "../components/caixa/caixa-list-results";
import { SearchToolbar } from "../components/common/search-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import api from "../services/api";
import { formatarData, formatarMoeda } from "../utils";

const filters = [
  { label: "Descrição", value: "descricao" },
  { label: "Data", value: "createdAt", type: "date" },
];

const Caixa = () => {
  const [caixa, setCaixa] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
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
      .post("caixa/consolidado", filter, { params: { limit, page } })
      .then((res) => {
        setCaixa(res.data);
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
          <SearchToolbar
            title={"Caixa"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="caixa-consolidado"
            dataExport={caixa}
            headExport={[
              { label: "Descrição", key: "descricao" },
              { label: "Data", key: "createdAt", format: (value) => formatarData(value) },
              { label: "Valor", key: "valor", format: (value) => formatarMoeda(value) },
              {
                label: "Tipo",
                key: "tipo",
                format: (value) => (value === "E" ? "Entrada" : "Saída"),
              },
            ]}
            addButtonHide
          />
          <Box sx={{ mt: 3 }}>
            <CaixaListResults
              caixa={caixa}
              totalRows={totalRows}
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
Caixa.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Caixa;
