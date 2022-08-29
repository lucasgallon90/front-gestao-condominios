import { useState, useEffect } from "react";
import Router from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { movimentacoes } from "../../__mocks__/movimentacoes";
import PerfectScrollbar from "react-perfect-scrollbar";
import { formatarMoeda } from "../../utils/index";
import { format } from "date-fns";

export const MovimentacaoDetails = ({ id, operation, onlyView }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState({
    nome: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                disabled={onlyView}
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                required
                value={values.descricao}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="Valor"
                name="valor"
                onChange={handleChange}
                required
                value={values.valor}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo Movimentação"
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
                label="Ratear"
                name="state"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                <option key="N" value={false}>
                  Não
                </option>
                <option key="S" value={true}>
                  Sim
                </option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data Vencimento"
                name="dataVencimento"
                InputLabelProps={{ shrink: true }}
                type="date"
                onChange={handleChange}
                value={null}
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
                onChange={handleChange}
                value={values.dataPagamento}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
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
          <Button
            color="error"
            variant="contained"
            onClick={() => Router.replace("/movimentacoes")}
          >
            Cancelar
          </Button>
          <Button color="primary" variant="contained">
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
