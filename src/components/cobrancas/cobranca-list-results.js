import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Card, IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from "@mui/material";
import { format } from "date-fns";
import Router from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { formatarMoeda } from "../../utils";

export const CobrancaListResults = ({ cobrancas, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickConsultar = (id) => {
    Router.push(`/cobrancas/view/${id}`);
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
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cobrancas?.slice(0, limit).map((cobranca) => (
                  <TableRow
                    hover
                    key={cobranca._id}
                  >
                    <TableCell>{format(cobranca.createdAt, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{cobranca.descricao}</TableCell>
                    <TableCell>{formatarMoeda(cobranca.valor)}</TableCell>
                    <TableCell>{format(cobranca.dataVencimento, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(cobranca.dataPagamento, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <Tooltip title="Visualizar">
                        <IconButton
                          onClick={()=>handleClickConsultar(cobranca._id)}
                          aria-label="edit"
                          color="success"
                        >
                          <VisibilityIcon />
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
        count={cobrancas?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CobrancaListResults.propTypes = {
  cobrancas: PropTypes.array.isRequired,
};
