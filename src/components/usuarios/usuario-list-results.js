import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import api from "../../services/api";
import { formatarTelefone } from "../../utils";
import { getInitials } from "../../utils/get-initials";

export const UsuarioListResults = ({
  usuarios,
  refreshData,
  page,
  setPage,
  limit,
  setLimit,
  totalRows = 0,
  loading = true,
  ...rest
}) => {
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/usuarios/view/${id}`);
  };

  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/usuarios/edit/${id}`);
  };

  const handleClickDeletar = (event, id) => {
    event.stopPropagation();
    Swal.fire({
      title: "Tem certeza que deseja deletar o registro?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Deletar",
    }).then((value) => {
      if (value.isConfirmed) {
        api
          .delete(`usuarios/delete/${id}`)
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
                  <TableCell>Nome</TableCell>
                  <TableCell>Condomínio</TableCell>
                  <TableCell>Apto.</TableCell>
                  <TableCell>Bloco</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={1000} sx={{ textAlign: "center" }}>
                      <Box>
                        {loading ? (
                          <>
                            Carregando...
                            <LinearProgress />
                          </>
                        ) : (
                          "Nenhum registro encontrado"
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {usuarios.map((usuario) => (
                  <TableRow
                    hover
                    key={usuario._id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClickConsultar(usuario._id)}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar sx={{ mr: 2 }}>{getInitials(usuario.nome)}</Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {usuario.nome}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{usuario.condominio?.nome}</TableCell>
                    <TableCell>{usuario.apto}</TableCell>
                    <TableCell>{usuario.bloco}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{formatarTelefone(usuario.telefone)}</TableCell>
                    <TableCell>
                      {usuario.tipoUsuario === "morador" && "Morador"}
                      {usuario.tipoUsuario === "admin" && "Administrador"}
                      {usuario.tipoUsuario === "gestor" && "Gestor Condomínio"}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, usuario._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, usuario._id)}
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

UsuarioListResults.propTypes = {
  usuarios: PropTypes.array.isRequired,
};
