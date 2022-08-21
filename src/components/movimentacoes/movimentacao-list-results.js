import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Chip,
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
import { getInitials } from "../../utils/get-initials";
import { formatarMoeda } from "src/utils";
import Router from "next/router";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const MovimentacaoListResults = ({ movimentacoes, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/movimentacoes/view/${id}`);
  };
  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/movimentacoes/edit/${id}`);
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
                  <TableCell>Data</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Dt. Vencimento</TableCell>
                  <TableCell>Dt. Pagamento</TableCell>
                  <TableCell>Ratear</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Entrada/Saída</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movimentacoes?.slice(0, limit).map((movimentacao) => (
                  <TableRow
                    hover
                    key={movimentacao._id}
                    onClick={() => handleClickConsultar(movimentacao._id)}
                  >
                    <TableCell>{format(movimentacao.createdAt, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{movimentacao.descricao}</TableCell>
                    <TableCell>{formatarMoeda(movimentacao.valor)}</TableCell>
                    <TableCell>{format(movimentacao.dataVencimento, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(movimentacao.dataPagamento, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{movimentacao.ratear ? "Sim" : "Não"}</TableCell>
                    <TableCell>{movimentacao.tipoMovimentacao?.descricao}</TableCell>
                    <TableCell>
                      {movimentacao.tipoMovimentacao?.tipo === "S" ? (
                        <Chip label="Saída" color="error" />
                      ) : (
                        <Chip label="Entrada" color="success" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, movimentacao._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, movimentacao._id)}
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
        count={movimentacoes?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MovimentacaoListResults.propTypes = {
  movimentacoes: PropTypes.array.isRequired,
};
