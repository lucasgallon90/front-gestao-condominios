import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { CondominioListResults } from "../../components/condominios/condominio-list-results";
import { DashboardLayout } from "../../components/dashboard-layout";
import api from "../../services/api";

const filters = [
  { label: "Nome", value: "nome", type: "string" },
  { label: "Endereço", value: "endereco", type: "string" },
  { label: "Cidade", value: "cidade", type: "string" },
  { label: "UF", value: "uf", type: "string" },
];

const Condominios = () => {
  const [condominios, setCondominios] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    list();
  }, [page, limit]);

  async function list(value) {
    setLoading(true);
    let filter = null;
    if (selectedFilter && (value || filterValue))
      filter = { [selectedFilter]: value || filterValue };
    await api
      .post("condominios/list", filter, { params: { limit, page } })
      .then((res) => {
        setCondominios(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Head>
        <title>Condominios</title>
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
            url="condominios"
            title={"Condomínios"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="condominios"
            dataExport={condominios}
            headExport={[
              { label: "Código", key: "codigoCondominio" },
              { label: "Nome", key: "nome" },
              { label: "Endereço", key: "endereco" },
              { label: "Cidade", key: "cidade" },
              { label: "UF", key: "uf" },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <CondominioListResults
              condominios={condominios}
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

Condominios.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Condominios;
