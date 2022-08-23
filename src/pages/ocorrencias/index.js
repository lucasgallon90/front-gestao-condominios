import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { OcorrenciaListResults } from "../../components/ocorrencias/ocorrencia-list-results";
import { format } from "date-fns";

const filters = [
  { label: "Data", value: "createdAt", type: "date" },
  { label: "Morador", value: "nomeMorador", type: "string" },
  { label: "Motivo", value: "motivo", type: "string" },
];

const Ocorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    list();
  }, []);

  async function list(value) {
    let filter = null;
    if (selectedFilter && (value || filterValue))
      filter = { [selectedFilter]: value || filterValue };
    await api
      .post("ocorrencias/list", filter, { params: { limit, page } })
      .then((res) => {
        setOcorrencias(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>Ocorrências</title>
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
            url="ocorrencias"
            title={"Ocorrências"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="ocorrencias"
            dataExport={ocorrencias}
            headExport={[
              {
                label: "Data",
                key: "createdAt",
                format: (value) => format(new Date(value), "dd/MM/yy"),
              },
              { label: "Motivo", key: "motivo" },
              {
                label: "Morador",
                key: "usuarioOcorrencia.nome",
              },
              { label: "Situação", key: "situacao" },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <OcorrenciaListResults
              ocorrencias={ocorrencias}
              page={page - 1}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              refreshData={list}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Ocorrencias.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Ocorrencias;
