import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useState } from "react";

export const TipoMovimentacaoDetails = ({ id, operation, onlyView }) => {
  const [values, setValues] = useState({
    descricao: "Conta à pagar",
    tipo: "S",
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
                disabled={onlyView}
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                value={values.descricao}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo"
                disabled={onlyView}
                name="state"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                <option key="E" value="E">
                  Entrada
                </option>
                <option key="S" value="S">
                  Saída
                </option>
              </TextField>
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
          {" "}
          {!onlyView ? (
            <>
              <Button
                color="error"
                variant="contained"
                onClick={() => Router.replace("/tipos-leitura")}
              >
                Cancelar
              </Button>
              <Button color="primary" variant="contained">
                Salvar
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => Router.replace("/tipos-leitura")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
