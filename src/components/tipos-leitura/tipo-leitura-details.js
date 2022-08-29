import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField
} from "@mui/material";
import Router from "next/router";
import { useState } from "react";
import { tiposLeitura } from "../../__mocks__/tiposLeitura";
import { formatarMoeda } from "../../utils";

export const TipoLeituraDetails = ({ id, operation, onlyView }) => {
  const [values, setValues] = useState(tiposLeitura[0]);

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
                label="Unidade Medida"
                name="unidadeMedida"
                disabled={onlyView}
                onChange={handleChange}
                value={values.unidadeMedida}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Taxa Fixa"
                name="taxaFixa"
                disabled={onlyView}
                onChange={handleChange}
                value={formatarMoeda(values.taxaFixa)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Unidade"
                name="valorUnidade"
                disabled={onlyView}
                onChange={handleChange}
                value={formatarMoeda(values.valorUnidade)}
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
          {" "}
          {!onlyView ? (
            <>
              <Button color="error" variant="contained" onClick={() => Router.replace("/tipos-leitura")}>
                Cancelar
              </Button>
              <Button color="primary" variant="contained">
                Salvar
              </Button>
            </>
          ) : (
            <Button color="primary" variant="contained" onClick={() => Router.replace("/tipos-leitura")}>
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
