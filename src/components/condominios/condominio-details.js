import {
  Box,
  Button,
  Card,
  CardContent, Grid,
  TextField
} from "@mui/material";
import Router from "next/router";
import { useState } from "react";
import { condominios } from "../../__mocks__/condominios";

export const CondominioDetails = ({ id, operation, onlyView }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(condominios[0]);

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
                label="Endereço"
                name="endereco"
                onChange={handleChange}
                required
                value={values.endereco}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="Cidade"
                name="cidade"
                onChange={handleChange}
                required
                value={values.cidade}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="UF"
                name="uf"
                required
                onChange={handleChange}
                value={values.uf}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="CEP"
                name="cep"
                onChange={handleChange}
                required
                type={"number"}
                value={values.cep}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Código Condomínio"
                helperText="Utilizado para novos moradores se cadastrarem"
                name="codigoCondominio"
                onChange={handleChange}
                required
                value={values.codigoCondominio}
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
          <Button
            color="error"
            variant="contained"
            onClick={() => Router.replace("/condominios")}
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
