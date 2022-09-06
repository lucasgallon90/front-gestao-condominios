import Head from "next/head";
import { Box, Container } from "@mui/material";
import { UsuarioListResults } from "../../components/usuarios/usuario-list-results";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useEffect, useState } from "react";
import api from "../../services/api";

const filters = [
  { label: "Nome", value: "nome" },
  { label: "Condomínio", value: "nomeCondominio" },
  { label: "Apto", value: "apto" },
  { label: "Email", value: "email", type: "email" },
];

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
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
      .post("usuarios/list", filter, { params: { limit, page } })
      .then((res) => {
        setUsuarios(res.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false));
  }
  return (
    <>
      <Head>
        <title>Usuários | Gestão de Condomínios</title>
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
            url="usuarios"
            title={"Usuários"}
            filters={filters}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            list={list}
            filenameExport="usuarios"
            dataExport={usuarios}
            headExport={[
              { label: "Nome", key: "nome" },
              { label: "Condomínio", key: "condominio" },
              { label: "Apto", key: "apto" },
              { label: "Email", key: "email" },
            ]}
          />

          <Box sx={{ mt: 3 }}>
            <UsuarioListResults
              usuarios={usuarios}
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
Usuarios.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Usuarios;
