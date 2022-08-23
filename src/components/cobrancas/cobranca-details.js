import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  Typography,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import Router from "next/router";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { cobrancas } from "../__mocks__/cobrancas";
import { formatarMoeda } from "../../utils/index";

export const CobrancaDetails = ({ id, operation, onlyView }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(cobrancas[0]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Descrição"
                name="descricao"
                value={values.descricao}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Valor Total"
                name="valor"
                value={formatarMoeda(values.valor || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data Vencimento"
                name="dataVencimento"
                InputLabelProps={{ shrink: true }}
                type="date"
                disabled
                value={format(values.dataVencimento, "yyyy-MM-dd")}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data Pagamento"
                InputLabelProps={{ shrink: true }}
                name="dataPagamento"
                type="date"
                disabled
                value={format(values.dataPagamento, "yyyy-MM-dd")}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Mês/Ano"
                name="mesAno"
                disabled
                value={values.mesAno}
                variant="outlined"
              >
              </TextField>
            </Grid> */}
            <Grid item xs={12}>
              <Divider />
              <Typography
                sx={{ justifyContent: "center", display: "flex", textAlign: "center" }}
                variant="subtitle1"
              >
                Selecione o morador e o mês/ano para carregar as contas a ratear e leituras
                correspondentes
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Selecionar Morador"
                name="state"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {[].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mês/Ano"
                name="state"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {[].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button color="primary" variant="contained">
              Carregar
            </Button>
          </Box>
        </CardContent>
        <Divider />
        <PerfectScrollbar>
          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Medida Leitura</TableCell>
                    <TableCell>Valor Rateado/Leitura</TableCell>
                    <TableCell>Data Vencimento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.itemsCobranca?.map((item) => (
                    <TableRow hover key={item._id}>
                      <TableCell>{formatarMoeda(item.valorTotal)}</TableCell>
                      <TableCell>8.4 m3</TableCell>
                      <TableCell>{formatarMoeda(item.valorRateado)}</TableCell>
                      <TableCell>{format(item.dataVencimento, "dd/MM/yy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Imprimir
          </Button>
          <Button color="error" variant="contained" onClick={() => Router.replace("/cobrancas")}>
            Voltar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
