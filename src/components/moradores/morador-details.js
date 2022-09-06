import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";
import { TextMaskCustom } from "../common/mask-input";

export const MoradorDetails = ({ id, operation, onlyView }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    nome: undefined,
    apto: undefined,
    email: undefined,
    telefone: undefined,
    state: undefined,
    country: undefined,
  });

  useEffect(() => {
    if (operation != "add") {
      getMorador();
    }
  }, []);

  async function getMorador() {
    return await api
      .get(`usuarios/moradores/${id}`)
      .then((res) => {
        res.data && setValues(res.data);
        reset(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  async function onSubmit() {
    const { _id, ...rest } = values;
    let requestConfig = {};
    if (operation === "edit") {
      requestConfig = {
        url: `usuarios/moradores/update/${id}`,
        method: "put",
        data: rest,
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro atualizado com sucesso`);
        Router.push("/moradores");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível cadastrar o registro, tente novamente mais tarde");
      });
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(() => onSubmit())}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("nome", {
                  required: true,
                })}
                fullWidth
                disabled={onlyView}
                label="Nome"
                name="nome"
                onChange={handleChange}
                required
                value={values.nome || ""}
                variant="outlined"
                error={errors.nome ? true : false}
                helperText={errors.nome ? "Campo obrigatório" : ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("apto", {
                  required: true,
                })}
                fullWidth
                disabled={onlyView}
                label="N° Apto"
                required
                name="apto"
                onChange={handleChange}
                value={values.apto || ""}
                variant="outlined"
                error={errors.apto ? true : false}
                helperText={errors.apto ? "Campo obrigatório" : ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="Bloco"
                name="bloco"
                onChange={handleChange}
                value={values.bloco || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("email", {
                  required: true,
                })}
                fullWidth
                disabled={onlyView}
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ""}
                variant="outlined"
                error={errors.email ? true : false}
                helperText={errors.email ? "Campo obrigatório" : ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                onChange={handleChange}
                disabled={onlyView}
                value={values.telefone || ""}
                variant="outlined"
                InputProps={{
                  inputComponent: TextMaskCustom,
                  inputProps: {
                    mask: "(00)0 0000-0000",
                  },
                }}
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
          {!onlyView ? (
            <>
              <Button
                color="error"
                variant="contained"
                onClick={() => Router.replace("/moradores")}
              >
                Cancelar
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Salvar
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => Router.replace("/moradores")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
