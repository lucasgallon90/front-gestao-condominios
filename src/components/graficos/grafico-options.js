import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { format } from "date-fns";

export const GraficoOptions = (props) => {
  const [values, setValues] = useState({
    dataInicial: "2022-01-01",
    dataFinal: format(new Date(), "yyyy-MM-dd"),
    tipoGrafico: "fluxoCaixa",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gráficos</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
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
          <Button color="primary" variant="contained">
            Gerar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
