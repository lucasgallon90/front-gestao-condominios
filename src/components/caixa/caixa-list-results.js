import {
  Box, Card, Chip, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TableRow,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { formatarData, formatarMoeda } from "../../utils";
import { TablePaginationComponent } from "../common/table-pagination";

export const CaixaListResults = ({ caixa, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


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
                  <TableRow
                    hover
                    key={operacao._id}
                  >
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
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePaginationComponent registers={caixa} page={page} limit={limit} />
    </Card>
  );
};

CaixaListResults.propTypes = {
  caixa: PropTypes.array.isRequired,
};
