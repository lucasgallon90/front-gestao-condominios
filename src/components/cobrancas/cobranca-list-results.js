import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
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
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import api from "../../services/api";
import { formatarData, formatarMoeda } from "../../utils";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import EmailIcon from "@mui/icons-material/Email";
import { imprimirCobranca } from "../../services/pdf";
import { printPDF } from "../../utils/print-pdf-cobranca";
import DialogCobrancaEmail from "./convite-email-dialog";
import { useState } from "react";

export const CobrancaListResults = ({
  cobrancas,
  refreshData,
  page,
  setPage,
  limit,
  setLimit,
  totalRows = 0,
  loading = true,
  ...rest
}) => {
  const [openDialogEnvioEmail, setOpenDialogEnvioEmail] = useState(false);
  const [idCobrancaEnvioEmail, setIdCobrancaEnvioEmail] = useState(null);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/cobrancas/view/${id}`);
  };

  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/cobrancas/edit/${id}`);
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
          .delete(`cobrancas/delete/${id}`)
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

  const handleClickImprimir = async (event, id) => {
    event.stopPropagation();
    try {
      const values = await api.get(`cobrancas/${id}`).then((res) => {
        return res.data;
      });
      const pdf = printPDF(imprimirCobranca(values));
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const blankWindow = window.open();
      blankWindow.location.href = url;
    } catch (err) {
      console.log(err);
      toast.error("Não foi possível gerar a impressão da cobrança, tente novamente mais tarde!");
    }
  };

  const handleClickEnviarEmail = (event, id) => {
    event.stopPropagation();
    setIdCobrancaEnvioEmail(id);
    setOpenDialogEnvioEmail(true);
  };

  return (
    <>
      <DialogCobrancaEmail
        open={openDialogEnvioEmail}
        setOpen={setOpenDialogEnvioEmail}
        idCobranca={idCobrancaEnvioEmail}
      />
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
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cobrancas?.length === 0 && (
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
                  {cobrancas?.map((cobranca) => (
                    <TableRow
                      hover
                      key={cobranca._id}
                      onClick={() => handleClickConsultar(cobranca._id)}
                    >
                      <TableCell>{formatarData(cobranca.createdAt)}</TableCell>
                      <TableCell>{cobranca.descricao}</TableCell>
                      <TableCell>{formatarMoeda(cobranca.valor)}</TableCell>
                      <TableCell>
                        {cobranca.dataVencimento ? formatarData(cobranca.dataVencimento) : "-"}
                      </TableCell>
                      <TableCell>
                        {cobranca.dataPagamento ? formatarData(cobranca.dataPagamento) : "-"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton
                            onClick={(event) => handleClickEditar(event, cobranca._id)}
                            aria-label="edit"
                            color="success"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar">
                          <IconButton
                            onClick={(event) => handleClickDeletar(event, cobranca._id)}
                            aria-label="delete"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Imprimmir">
                          <IconButton
                            onClick={(event) => handleClickImprimir(event, cobranca._id)}
                            aria-label="print"
                            color="warning"
                          >
                            <LocalPrintshopIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Enviar cobrança por email">
                          <IconButton
                            onClick={(event) => handleClickEnviarEmail(event, cobranca._id)}
                            aria-label="email"
                            color="secondary"
                          >
                            <EmailIcon />
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
    </>
  );
};

CobrancaListResults.propTypes = {
  cobrancas: PropTypes.array.isRequired,
};
