import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import api from "../../services/api";
import { formatarCEP } from "../../utils";

const pageUrl = "condominios";

export const CondominioListResults = ({
  condominios,
  refreshData,
  page,
  setPage,
  limit,
  setLimit,
  totalRows = 0,
  ...rest
}) => {
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/${pageUrl}/view/${id}`);
  };
  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/${pageUrl}/edit/${id}`);
  };

  const handleClickDeletar = (event, id) => {
    event.stopPropagation();
    Swal.fire({
      icon: "warning",
      title: "Tem certeza que deseja deletar o registro?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Deletar",
    }).then((value) => {
      if (value.isConfirmed) {
        api 
          .delete(`${pageUrl}/delete/${id}`)
          .then((res) => {
            toast.success("Registro deletado com sucesso");
            refreshData();
          })
          .catch((error) => {
            toast.error("Não foi possível deletar o registro");
            console.log(error);
          });
      }
    });
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>Cidade</TableCell>
                  <TableCell>UF</TableCell>
                  <TableCell>CEP</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {condominios?.map((condominio) => (
                  <TableRow
                    hover
                    key={condominio._id}
                    onClick={() => handleClickConsultar(condominio._id)}
                  >
                    <TableCell>{condominio.codigoCondominio}</TableCell>
                    <TableCell>{condominio.nome}</TableCell>
                    <TableCell>{condominio.endereco}</TableCell>
                    <TableCell>{condominio.cidade}</TableCell>
                    <TableCell>{condominio.uf}</TableCell>
                    <TableCell>{formatarCEP(condominio.cep)}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, condominio._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, condominio._id)}
                          aria-label="delete"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalRows}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CondominioListResults.propTypes = {
  condominios: PropTypes.array.isRequired,
};
