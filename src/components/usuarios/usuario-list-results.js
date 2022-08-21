import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
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
  Typography,
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import { getInitials } from "../../utils/get-initials";

export const UsuarioListResults = ({ usuarios, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
                {usuarios?.slice(0, limit).map((usuario) => (
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
                    <TableCell>{usuario.telefone}</TableCell>
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
        count={usuarios?.length}
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
