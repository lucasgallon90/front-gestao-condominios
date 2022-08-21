import Head from "next/head";
import { Box, Container } from "@mui/material";
import { UsuarioListResults } from "../../components/usuarios/usuario-list-results";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { usuarios } from "../../__mocks__/usuarios";

const filters = [
  { label: "Nome", value: "nome" },
  { label: "Condomínio", value: "condominio" },
  { label: "Apto", value: "apto" },
  { label: "Email", value: "email", type: "email" },
];

const Usuarios = () => (
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
        <SearchToolbar title="Usuários" url="usuarios" filters={filters} />

        <Box sx={{ mt: 3 }}>
          <UsuarioListResults usuarios={usuarios} />
        </Box>
      </Container>
    </Box>
  </>
);
Usuarios.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Usuarios;
