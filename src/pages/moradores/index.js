import Head from "next/head";
import { Box, Container } from "@mui/material";
import { MoradorListResults } from "../../components/moradores/morador-list-results";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { moradores } from "../../__mocks__/moradores";
import { useEffect, useState } from "react";
import api from "../../services/api";

const filters = [
  { label: "Nome", value: "nome" },
  { label: "Apto", value: "apto" },
  { label: "Bloco", value: "bloco" },
  { label: "Email", value: "email", type: "email" },
];

const Moradores = () => {
  const [moradores, setMoradores] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    list();
  }, []);

  async function list(value) {
    setLoading(true);
    let filter = null;
    if (selectedFilter && (value || filterValue))
      filter = { [selectedFilter]: value || filterValue };
    await api
      .post("usuarios/list/moradores", filter, { params: { limit, page } })
      .then((res) => {
        setMoradores(res.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false));
  }

  return (
    <>
      <Head>
        <title>Moradores | Gestão de Condomínios</title>
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
            url="moradores"
            title={"Moradores"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="moradores"
            dataExport={moradores}
            headExport={[
              { label: "Nome", key: "nome" },
              { label: "Apto", key: "apto" },
              { label: "Bloco", key: "bloco" },
              { label: "Email", key: "email" },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <MoradorListResults
              moradores={moradores}
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
Moradores.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Moradores;
