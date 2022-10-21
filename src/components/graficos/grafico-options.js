import { Route } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
    dataInicial: moment().subtract(1, "month").format("YYYY-MM-DD"),
    dataFinal: moment().format("YYYY-MM-DD"),
    tipoGrafico: "fluxoCaixa",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    Router.push("graficos/view");
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
          <Button color="primary" variant="contained" type="submit">
            Gerar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
