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
} from "@mui/material";

export const MoradorDetails = ({ id, operation, onlyView }) => {
  const [values, setValues] = useState({
    nome: "Katarina",
    apto: "401",
    email: "katarina@gestaodecondominios.com.br",
    telefone: "(54) 99999 9999",
    state: "Alabama",
    country: "USA",
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
                label="Nome"
                name="nome"
                onChange={handleChange}
                required
                value={values.nome}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="N° Apto"
                required
                name="apto"
                onChange={handleChange}
                value={values.apto}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="Bloco"
                name="bloco"
                onChange={handleChange}
                value={values.bloco}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                onChange={handleChange}
                disabled
                value={values.telefone}
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
                Salvar
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => Router.replace("/tipos-leitura")}
              >
                Cancelar
              </Button>
        </Box>
      </Card>
    </form>
  );
};
