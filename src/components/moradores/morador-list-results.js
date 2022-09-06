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
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import { formatarTelefone } from "../../utils";
import { getInitials } from "../../utils/get-initials";

export const MoradorListResults = ({
  moradores,
  refreshData,
  page,
  setPage,
  limit,
  setLimit,
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
    Router.push(`/moradores/view/${id}`);
  };

  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/moradores/edit/${id}`);
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
          .delete(`usuarios/moradores/delete/${id}`)
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
                  <TableCell>Apto.</TableCell>
                  <TableCell>Bloco</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moradores?.length === 0 && (
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
                {moradores.map((morador) => (
                  <TableRow
                    hover
                    key={morador._id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClickConsultar(morador._id)}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar sx={{ mr: 2 }}>{getInitials(morador.nome)}</Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {morador.nome}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{morador.apto}</TableCell>
                    <TableCell>{morador.bloco}</TableCell>
                    <TableCell>{morador.email}</TableCell>
                    <TableCell>{formatarTelefone(morador.telefone)}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, morador._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, morador._id)}
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
        count={moradores?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MoradorListResults.propTypes = {
  moradores: PropTypes.array.isRequired,
};
