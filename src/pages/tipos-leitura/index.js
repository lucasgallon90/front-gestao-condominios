import { Box, Container } from "@mui/material";
import Head from "next/head";
import { TiposLeituraListResults } from "../../components/tipos-leitura/tipos-leitura-list-results";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import api from "../../services/api";
import { useEffect, useState } from "react";

const filters = [
  { label: "Descrição", value: "descricao", type: "string" },
  { label: "Únidade de medida", value: "unidadeMedida", type: "string" },
];

const TiposLeitura = () => {
  const [tiposLeitura, setTiposLeitura] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
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
      .post("tipos-leitura/list", filter, { params: { limit, page } })
      .then((res) => {
        setTiposLeitura(res.data);
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
          <SearchToolbar
            url="tipos-leitura"
            title={"Tipos de Leitura"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="tipos-leitura"
            dataExport={tiposLeitura}
            headExport={[
              { label: "Descrição", key: "descricao" },
              {
                label: "Únidade de medida",
                key: "unidadeMedida",
              },
              { label: "Taxa Fixa", key: "taxaFixa" },
              { label: "Valor unidade", key: "valorUnidade" },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <TiposLeituraListResults
              tiposLeitura={tiposLeitura}
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

TiposLeitura.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TiposLeitura;
