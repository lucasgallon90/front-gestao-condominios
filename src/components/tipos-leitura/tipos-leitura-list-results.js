import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card, IconButton, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow, Tooltip
} from "@mui/material";
import Router from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import { formatarMoeda } from "../../utils";

export const TiposLeituraListResults = ({ tiposLeitura, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/tipos-leitura/view/${id}`);
  };

  const handleClickEditar = (event, id) => {
    event.stopPropagation();
    Router.push(`/tipos-leitura/edit/${id}`);
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
                  <TableCell>Und. Medida</TableCell>
                  <TableCell>Taxa Fixa</TableCell>
                  <TableCell>Valor Unidade</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tiposLeitura?.slice(0, limit).map((tipoLeitura) => (
                  <TableRow
                    hover
                    key={tipoLeitura._id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClickConsultar(tipoLeitura._id)}
                  >
                    <TableCell>{tipoLeitura.descricao}</TableCell>
                    <TableCell>{tipoLeitura.unidadeMedida}</TableCell>
                    <TableCell>{formatarMoeda(tipoLeitura.taxaFixa)}</TableCell>
                    <TableCell>{formatarMoeda(tipoLeitura.valorUnidade)}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={(event) => handleClickEditar(event, tipoLeitura._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar">
                        <IconButton
                          onClick={(event) => handleClickDeletar(event, tipoLeitura._id)}
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
        count={tiposLeitura?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TiposLeituraListResults.propTypes = {
  tiposLeitura: PropTypes.array.isRequired,
};
