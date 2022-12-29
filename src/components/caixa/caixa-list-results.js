import {
  Box,
  Card,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { formatarData, formatarMoeda } from "../../utils";

export const CaixaListResults = ({
  caixa,
  page,
  setPage,
  limit,
  setLimit,
  loading = true,
  totalRows = 0,
  saldoCaixaAtual = 0,
  saldoCaixaInicial = 0,
  ...rest
}) => {
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                  <TableCell>Data</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Entrada/Saída</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {caixa.slice(0, limit).map((operacao) => (
                  <TableRow hover key={operacao._id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {operacao.descricao}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatarData(operacao.createdAt)}</TableCell>
                    <TableCell>{formatarMoeda(operacao.valor)}</TableCell>
                    <TableCell>
                      <Chip label="Entrada" color="success" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} />
                  <Typography variant="caption">
                    Total Inicial: {formatarMoeda(saldoCaixaInicial)}
                  </Typography>
                  <Typography>
                    <b>Total Atual: </b> {formatarMoeda(saldoCaixaAtual)}
                  </Typography>
                </TableRow>
              </TableFooter>
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
        rowsPerPageOptions={[]}
      />
    </Card>
  );
};

CaixaListResults.propTypes = {
  caixa: PropTypes.array.isRequired,
};
