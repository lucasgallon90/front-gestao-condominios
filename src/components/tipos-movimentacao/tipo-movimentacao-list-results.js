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
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import { Chip } from "../chip";

export const TipoMovimentacaoListResults = ({ tiposMovimentacao, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/tipos-movimentacao/view/${id}`);
  };

  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/tipos-movimentacao/edit/${id}`);
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
                  <TableCell>Descrição</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tiposMovimentacao?.slice(0, limit).map((tipoMovimentacao) => (
                  <TableRow
                    hover
                    key={tipoMovimentacao._id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClickConsultar(tipoMovimentacao._id)}
                  >
                    <TableCell>{tipoMovimentacao.descricao}</TableCell>
                    <TableCell>
                      {tipoMovimentacao?.tipo === "S" ? (
                        <Chip color="error">Saída</Chip>
                      ) : (
                        <Chip color="success">Entrada</Chip>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, tipoMovimentacao._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, tipoMovimentacao._id)}
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
        count={tiposMovimentacao?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TipoMovimentacaoListResults.propTypes = {
  tiposMovimentacao: PropTypes.array.isRequired,
};
