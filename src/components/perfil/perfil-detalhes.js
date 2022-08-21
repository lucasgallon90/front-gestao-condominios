import { useEffect, useState } from "react";
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
import api from "src/services/api";

export const PerfilDetalhes = (props) => {
  const [values, setValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    apto: "",
    bloco: "",
  });

  useEffect(async () => {
    api
      .get("auth/user-info")
      .then((res) => {
        res.data &&
          setValues({
            nome: res.data.nome || "",
            email: res.data.email || "",
            apto: res.data.apto || "",
            bloco: res.data.bloco || "",
            telefone: res.data.telefone || "",
          });
      })
      .catch((error) => {
        consolee.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Edite o seu perfil abaixo" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                onChange={handleChange}
                required
                value={values?.nome}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                fullWidth
                label="Apto"
                name="apto"
                onChange={handleChange}
                value={values?.apto}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Bloco"
                name="bloco"
                onChange={handleChange}
                value={values?.bloco}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={values?.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                onChange={handleChange}
                type="number"
                value={values?.telefone}
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
        </Box>
      </Card>
    </form>
  );
};
