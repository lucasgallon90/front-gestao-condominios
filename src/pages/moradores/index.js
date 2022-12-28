import { Box, Button, Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { SearchToolbar } from "../../components/common/search-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import DialogConviteEmail from "../../components/moradores/convite-email-dialog";
import { MoradorListResults } from "../../components/moradores/morador-list-results";
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
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openDialogConviteEmail, setOpenDialogConviteEmail] = useState(false);

  useEffect(() => {
    list();
  }, [page, limit]);

  async function list(value) {
    setLoading(true);
    let filter = { ativo: true };
    if (selectedFilter && (value || filterValue))
      filter = { [selectedFilter]: value || filterValue };
    await api
      .post("usuarios/list/moradores", filter, { params: { limit, page } })
      .then((res) => {
        setMoradores(res.data);
        setTotalRows(Number(res.headers["x-total-count"] || 0));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  function handleClickConvite() {
    Swal.fire({
      icon: "info",
      title: "Selecione abaixo a opção de convite",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#9b59b6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Copia & cola",
      denyButtonText: "Email",
      cancelButtonText: "Cancelar",
    }).then(async (value) => {
      if (value.isConfirmed) {
        const link = await api
          .get("usuarios/convite-registro-link")
          .then((res) => res.data.link)
          .catch(() => {
            toast.error("Não foi possível obter o link, tente novamente mais tarde!");
            return "";
          });
        if (link) {
          navigator.clipboard.writeText(link);
          toast.success("Link copiado com sucesso!");
        }
      }
      if (value.isDenied) {
        setOpenDialogConviteEmail(true);
      }
    });
  }

  return (
    <>
      <DialogConviteEmail
        open={openDialogConviteEmail}
        setOpen={setOpenDialogConviteEmail}
      ></DialogConviteEmail>
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
            addButtonHide
            extraButton={
              <Button id="add" color="primary" variant="contained" onClick={handleClickConvite}>
                Convite
              </Button>
            }
          />

          <Box sx={{ mt: 3 }}>
            <MoradorListResults
              moradores={moradores}
              page={page - 1}
              setPage={setPage}
              totalRows={totalRows}
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
