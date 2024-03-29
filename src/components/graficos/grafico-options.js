import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import moment from "moment";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const GraficoOptions = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    dataInicial: moment().subtract(12, "month").format("YYYY-MM-DD"),
    dataFinal: moment().format("YYYY-MM-DD"),
    tipoGrafico: "fluxoCaixa",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    setLoading(true);
    if (moment(values.dataFinal).diff(values.dataInicial, "months") > 12) {
      Swal.fire("Período deve ser menor que 12 meses", "", "warning");
      return;
    }
    Router.push({
      pathname: "graficos/view",
      query: { dataInicial: values.dataInicial, dataFinal: values.dataFinal },
    });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(() => onSubmit())}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <FormControl>
                <FormLabel id="radio-buttons-group-label">Gráficos</FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="fluxoCaixa"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="fluxoCaixa"
                    control={<Radio />}
                    label="Fluxo de caixa (Gráfico de Barras)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                {...register("dataInicial", {
                  required: true,
                  validate: (value) => moment(value).isSameOrBefore(values.dataFinal),
                })}
                error={errors.dataInicial ? true : false}
                helperText={errors.dataInicial ? "Datas incorretas" : ""}
                label="Data Inicial"
                name="dataInicial"
                type="date"
                onChange={handleChange}
                required
                value={values.dataInicial}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                {...register("dataFinal", {
                  required: true,
                  validate: (value) => moment(value).isSameOrAfter(values.dataInicial),
                })}
                error={errors.dataFinal ? true : false}
                helperText={errors.dataFinal ? "Datas incorretas" : ""}
                label="Data Final"
                name="dataFinal"
                type="date"
                onChange={handleChange}
                value={values.dataFinal}
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
          <Button disabled={loading} type="submit" name="gerar">
              {loading && <>Gerando <CircularProgress size={14} /></>}
              {!loading && "Gerar"}
            </Button>
        </Box>
      </Card>
    </form>
  );
};
