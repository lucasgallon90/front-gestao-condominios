import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { LeituraListResults } from "../../components/leituras/leitura-list-results";
import api from "../../services/api";

const filters = [
  { label: "Morador", value: "nomeMorador" },
  { label: "Mês/Ano", value: "mesAno", type: "mesAno" },
  { label: "Tipo Leitura", value: "tipoLeitura" },
];

const Leituras = () => {
  const [leituras, setLeituras] = useState([]);
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
      .post("leituras/list", filter, { params: { limit, page } })
      .then((res) => {
        setLeituras(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
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
          <SearchToolbar
            url="leituras"
            title={"Leituras"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="leituras"
            dataExport={leituras}
            headExport={[
              { label: "Morador", key: "nomeMorador" },
              { label: "Mês/Ano", key: "mesAno" },
              { label: "Tipo Leitura", key: "tipoLeitura" },
            ]}
          />
          <Box sx={{ mt: 3 }}>
            <LeituraListResults
              leituras={leituras}
              url="leituras"
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

Leituras.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Leituras;
