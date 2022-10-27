import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  Chip,
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
} from "@mui/material";
import { format, parse, parseISO } from "date-fns";
import Router from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import api from "../../services/api";
import { formatarData, formatarMoeda } from "../../utils";

export const MovimentacaoListResults = ({
  movimentacoes,
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
    Router.push(`/movimentacoes/view/${id}`);
  };
  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/movimentacoes/edit/${id}`);
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
          .delete(`movimentacoes/delete/${id}`)
          .then(() => {
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
              {movimentacoes?.length === 0 && (
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
                {movimentacoes.map((movimentacao) => (
                  <TableRow
                    hover
                    key={movimentacao._id}
                    onClick={() => handleClickConsultar(movimentacao._id)}
                  >
                    <TableCell>{formatarData(movimentacao?.createdAt)}</TableCell>
                    <TableCell>{movimentacao.descricao}</TableCell>
                    <TableCell>{formatarMoeda(movimentacao.valor)}</TableCell>
                    <TableCell>
                      {movimentacao?.dataVencimento
                        ? formatarData(movimentacao?.dataVencimento)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {movimentacao?.dataPagamento
                        ? formatarData(movimentacao?.dataPagamento)
                        : "-"}
                    </TableCell>
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
