import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { formatarDecimal, formatarMoeda } from "../../utils";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ptLocale from "date-fns/locale/pt-BR";
import Router from "next/router";
import { leituras } from "src/__mocks__/leituras";

const moradores = [{ id: uuid(), label: "Joaquim" }];

export const LeituraDetails = ({ id, operation, onlyView }) => {
  const [values, setValues] = useState(leituras[0]);

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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                fullWidth
                options={moradores}
                renderInput={(params) => <TextField {...params} label="Morador" />}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="N° Apto"
                name="apto"
                onChange={handleChange}
                value={values.apto}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                <DatePicker
                  views={["year", "month"]}
                  label="Mês/Ano"
                  minDate={new Date("2012-03-01")}
                  maxDate={new Date("2023-06-01")}
                  value={values.mesAno}
                  onChange={(newValue) => {
                    setValues({ ...values, mesAno: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth helperText={null} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo Leitura"
                name="tipoLeitura"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                <option key="N" value={false}>
                  Água
                </option>
                <option key="S" value={true}>
                  Gás
                </option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Leitura Anterior"
                name="leituraAnterior"
                onChange={handleChange}
                required
                value={formatarDecimal(values.leituraAnterior || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Leitura Atual"
                name="leituraAtual"
                onChange={handleChange}
                required
                value={formatarDecimal(values.leituraAtual || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Taxa Fixa"
                name="taxaFixa"
                onChange={handleChange}
                required
                value={formatarMoeda(values.tipoLeitura?.taxaFixa || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Unidade"
                name="valor"
                onChange={handleChange}
                disabled
                required
                value={formatarMoeda(values.tipoLeitura?.valorUnidade || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Leitura"
                name="valor"
                onChange={handleChange}
                disabled
                required
                value={formatarMoeda(values.valor || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Total"
                name="valor"
                disabled
                onChange={handleChange}
                required
                value={formatarMoeda(values.valor + values.tipoLeitura?.taxaFixa || 0)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="error" variant="contained" onClick={() => Router.replace("/leituras")}>
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
