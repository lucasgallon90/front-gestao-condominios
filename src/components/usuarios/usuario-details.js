import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import AutoComplete from "../common/auto-complete";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import toast from "react-hot-toast";
import { TextMaskCustom } from "../common/mask-input";
import { useUser } from "../../contexts/authContext";

export const UsuarioDetails = ({ id, operation, onlyView }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { user } = useUser();
  const [values, setValues] = useState({
    nome: undefined,
    apto: undefined,
    email: undefined,
    telefone: undefined,
    tipoUsuario: "morador",
    condominio: undefined,
    confirmacaoSenha: undefined,
    senha: undefined,
    ativo: true,
  });
  const [condominios, setCondominios] = useState([]);

  useEffect(async () => {
    async function load() {
      let usuario;
      if (operation != "add") {
        usuario = await getUsuario();
      }
      if (!onlyView) {
        if (operation === "add") {
          const res = await loadCondominios();
          setValues({ ...values, condominio: res[0] });
        } else {
          usuario?.condominio && setCondominios([usuario.condominio]);
        }
      }
    }
    load();
  }, []);

  async function getUsuario() {
    return await api
      .get(`usuarios/${id}`)
      .then((res) => {
        res.data && setValues(res.data);
        reset(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  async function loadCondominios(nomeCondominio) {
    let filter = null;
    if (nomeCondominio) filter = { nome: nomeCondominio };
    return api
      .post("condominios/list", filter)
      .then((res) => {
        setCondominios(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCondominio = (condominioSelecionado) => {
    if (condominioSelecionado) {
      clearErrors('condominio')
      setValues({ ...values, condominio: condominioSelecionado });
      
    } else {
      setValues({ ...values, condominio: undefined });
    }
  };

  async function onSubmit() {
    const { condominio, _id, confirmacaoSenha, ...rest } = values;
    if (!condominio) {
      setError('condominio', { type: 'required', message: 'Campo obrigatório' });
      return;
    }
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `usuarios/create`,
        method: "post",
        data: { ...rest, _idCondominio: condominio._id },
      };
    } else {
      requestConfig = {
        url: `usuarios/update/${id}`,
        method: "put",
        data: { ...rest, _idCondominio: condominio._id },
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/usuarios");
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
              <AutoComplete
                disabled={onlyView}
                label="Condomínio"
                data={condominios}
                selectedValue={values.condominio}
                required={true}
                name={"condominio"}
                errors={errors}
                optionLabel="nome"
                optionKey="_id"
                loadOptions={(nomeCondominio) => loadCondominios(nomeCondominio)}
                handleChangeSelectedValue={handleChangeCondominio}
              ></AutoComplete>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="N° Apto"
                name="apto"
                onChange={handleChange}
                value={values.apto || ""}
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
            {(!onlyView && operation === "add") && (
              <>
                <Grid item md={6} xs={12}>
                  <TextField
                    {...register("senha", {
                      required: true,
                      validate: (data) => (data != values.confirmacaoSenha ? false : true),
                    })}
                    fullWidth
                    label="Senha"
                    name="senha"
                    onChange={handleChange}
                    type="password  "
                    required={!onlyView && operation === "add"}
                    value={values.senha}
                    variant="outlined"
                    error={errors.senha ? true : false}
                    helperText={
                      errors.senha
                        ? errors.senha != errors.confirmacaoSenha
                          ? "Senha difere da confirmação"
                          : "Campo obrigatório"
                        : ""
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    {...register("confirmacaoSenha", {
                      required: true,
                    })}
                    fullWidth
                    onChange={handleChange}
                    required={!onlyView && operation === "add"}
                    label="Confirmação Senha"
                    name="confirmacaoSenha"
                    type="password"
                    value={values.confirmacaoSenha}
                    variant="outlined"
                    error={errors.confirmacaoSenha ? true : false}
                    helperText={errors.confirmacaoSenha ? "Campo obrigatório" : ""}
                  />
                </Grid>
              </>
            )}
            <Grid item md={6} xs={12}>
              <TextField
                {...register("tipoUsuario", {
                  required: true,
                })}
                fullWidth
                label="Tipo de Usuário"
                name="tipoUsuario"
                onChange={handleChange}
                select
                required
                disable={user}
                disabled={onlyView}
                SelectProps={{ native: true }}
                value={values.tipoUsuario || "morador"}
                variant="outlined"
              >
                {[
                  { label: "Morador", value: "morador" },
                  { label: "Admin", value: "admin" },
                  { label: "Super Admin", value: "superAdmin" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("ativo", {
                  required: true,
                })}
                fullWidth
                label="Ativo"
                name="ativo"
                required
                onChange={handleChange}
                select
                disabled={onlyView}
                SelectProps={{ native: true }}
                value={values.ativo}
                variant="outlined"
              >
                {[
                  { label: "Sim", value: true },
                  { label: "Não", value: false },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
          {!onlyView ? (
            <>
              <Button name="cancel" color="error" variant="contained" onClick={() => Router.replace("/usuarios")}>
                Cancelar
              </Button>
              <Button name="save" color="primary" variant="contained" type="submit">
                Salvar
              </Button>
            </>
          ) : (
            <Button name="back" color="primary" variant="contained" onClick={() => Router.replace("/usuarios")}>
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
