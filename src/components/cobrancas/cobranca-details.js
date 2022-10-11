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
import { cobrancas } from "../../__mocks__/cobrancas";
import { formatarData, formatarMoeda } from "../../utils/index";
import { useUser } from "../../contexts/authContext";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

export const CobrancaDetails = ({ id, operation, onlyView }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    descricao: "",
    valorTotal: 0,
    dataVencimento: undefined,
    dataPagamento: undefined,
  });

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
                required
                disabled={onlyView}
                label="Descrição"
                name="descricao"
                value={values.descricao}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                disabled={onlyView}
                label="Valor Total"
                name="valor"
                value={formatarMoeda(values.valor || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                label="Data Vencimento"
                name="dataVencimento"
                variant="outlined"
                disabled={onlyView}
                value={values.dataVencimento || null}
                onChange={(value) => handleChange({ target: { name: "dataVencimento", value } })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                label="Data Pagamento"
                name="dataPagamento"
                variant="outlined"
                disabled={onlyView}
                value={values.dataPagamento || null}
                onChange={(value) => handleChange({ target: { name: "dataPagamento", value } })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
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
                disabled={onlyView}
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
                disabled={onlyView}
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
            {!onlyView && (
              <Button color="primary" variant="contained">
                Carregar
              </Button>
            )}
          </Box>
        </CardContent>
        <Divider />
        <PerfectScrollbar>
          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Medida Leitura</TableCell>
                    <TableCell>Valor Rateado/Leitura</TableCell>
                    <TableCell>Data Vencimento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.itemsCobranca?.map((item) => (
                    <TableRow hover key={item._id}>
                      <TableCell>{item.descricao}</TableCell>
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
          {!onlyView ? (
            <>
              <Button
                name="cancel"
                color="error"
                variant="contained"
                onClick={() => Router.replace("/cobrancas")}
              >
                Cancelar
              </Button>
              <Button name="save" color="primary" variant="contained" type="submit">
                Salvar
              </Button>
            </>
          ) : (
            <Button
              name="back"
              color="primary"
              variant="contained"
              onClick={() => Router.replace("/cobrancas")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
