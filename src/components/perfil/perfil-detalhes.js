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
import api from "../../services/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Router from "next/router";
import { setCookie } from "nookies";
import { useUser } from "../../contexts/authContext";
import { TextMaskCustom } from "../common/mask-input";

export const PerfilDetalhes = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    id: undefined,
    nome: "",
    email: "",
    telefone: "",
    apto: "",
    bloco: "",
    _idCondominio: undefined,
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
            _idCondominio: res.data._idCondominio,
            id: res.data._id,
          });
          reset(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function onSubmit() {
    const { id, ...rest } = values;
    let requestConfig = {
      url: `usuarios/update-usuario-logado`,
      method: "put",
      data: rest,
    };
    await api(requestConfig)
      .then((res) => {
        toast.success(`Registro atualizado com sucesso`);
        setCookie(undefined, ["gc.token"], res.data.token, {
          maxAge: 60 * 60 * 24, //24 horas
        });
        api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
        Router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível alterar o perfil, tente novamente mais tarde");
      });
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(() => onSubmit())}>
      <Card>
        <CardHeader subheader="Edite o seu perfil abaixo" title="Perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("nome", {
                  required: true,
                })}
                fullWidth
                label="Nome"
                name="nome"
                onChange={handleChange}
                required
                value={values?.nome}
                variant="outlined"
                error={errors.nome ? true : false}
                helperText={errors.nome ? "Campo obrigatório" : ""}
              />
            </Grid>
            {user?.tipoUsuario != "superAdmin" && (<><Grid item md={6} xs={12}>
              <TextField
                {...register("apto", {
                  required: user?.tipoUsuario != "admin",
                })}
                required={user?.tipoUsuario != "admin"}
                fullWidth
                label="Apto"
                name="apto"
                onChange={handleChange}
                value={values?.apto}
                variant="outlined"
                error={errors.apto ? true : false}
                helperText={errors.apto ? "Campo obrigatório" : ""}
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
            </>)}
            <Grid item md={6} xs={12}>
              <TextField
                {...register("email", {
                  required: true,
                })}
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={values?.email}
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
          <Button name="save" color="primary" variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
