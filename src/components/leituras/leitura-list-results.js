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
import Swal from "sweetalert2";
import api from "../../services/api";
import { formatarDecimal } from "../../utils";

export const LeituraListResults = ({
  leituras,
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
    Router.push(`/leituras/view/${id}`);
  };
  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/leituras/edit/${id}`);
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
          .delete(`leituras/delete/${id}`)
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
                  <TableCell>Mês/Ano</TableCell>
                  <TableCell>Morador</TableCell>
                  <TableCell>Leitura Ant.</TableCell>
                  <TableCell>Leitura Atual</TableCell>
                  <TableCell>Tipo Leitura</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leituras?.map((leitura) => (
                  <TableRow
                    hover
                    key={leitura._id}
                    onClick={() => handleClickConsultar(leitura._id)}
                  >
                    <TableCell>{format(new Date(leitura.mesAno), "MM/yyyy")}</TableCell>
                    <TableCell>{leitura.morador?.nome}</TableCell>
                    <TableCell>{formatarDecimal(leitura.leituraAnterior, 3)}</TableCell>
                    <TableCell>{formatarDecimal(leitura.leituraAtual, 3)}</TableCell>
                    <TableCell>{leitura.tipoLeitura?.descricao}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, leitura._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, leitura._id)}
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
        count={leituras?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LeituraListResults.propTypes = {
  leituras: PropTypes.array.isRequired,
};
