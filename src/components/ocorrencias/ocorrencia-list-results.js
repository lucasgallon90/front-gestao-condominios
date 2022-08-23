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
import { format } from "date-fns";
import Router from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import api from "../../services/api";
import Swal from "sweetalert2";
import { Chip } from "../chip";

export const OcorrenciaListResults = ({ ocorrencias, refreshData, page, setPage, limit, setLimit, ...rest }) => {
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/ocorrencias/view/${id}`);
  };
  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/ocorrencias/edit/${id}`);
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
          .delete(`ocorrencias/delete/${id}`)
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
                  <TableCell>Data</TableCell>
                  <TableCell>Motivo</TableCell>
                  <TableCell>Morador</TableCell>
                  <TableCell>Situação</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ocorrencias?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={1000} sx={{ textAlign: "center" }}>
                      Nenhum registro encontrado
                    </TableCell>
                  </TableRow>
                )}
                {ocorrencias.map((ocorrencia) => (
                  <TableRow
                    hover
                    key={ocorrencia._id}
                    onClick={() => handleClickConsultar(ocorrencia._id)}
                  >
                    <TableCell>{format(new Date(ocorrencia.createdAt), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{ocorrencia.motivo}</TableCell>
                    <TableCell>{ocorrencia.usuarioOcorrencia.nome}</TableCell>
                    <TableCell>
                      <Chip
                        color={
                          (ocorrencia.situacao === "Resolvida" && "success") ||
                          (ocorrencia.situacao === "Em progresso" && "warning") ||
                          "error"
                        }
                      >
                        {ocorrencia.situacao}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, ocorrencia._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, ocorrencia._id)}
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
        count={ocorrencias?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OcorrenciaListResults.propTypes = {
  ocorrencias: PropTypes.array.isRequired,
};
