import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/authContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import { TextMaskCustom } from "../common/mask-input";

export const CondominioDetails = ({ id, operation, onlyView }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    codigoCondominio: undefined,
    nome: undefined,
    endereco: undefined,
    cidade: undefined,
    cep: undefined,
    uf: undefined,
  });

  useEffect(() => {
    if (user) {
      operation != "add" && getCondominio();
    }
  }, [user]);

  async function getCondominio() {
    await api
      .get(`condominios/${id}`)
      .then((res) => {
        res.data &&
          setValues({
            codigoCondominio: res.data.codigoCondominio,
            nome: res.data.nome,
            endereco: res.data.endereco,
            cidade: res.data.cidade,
            uf: res.data.uf,
            cep: res.data.cep,
          });
        reset({ ...res.data });
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
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `condominios/create`,
        method: "post",
        data: values,
      };
    } else {
      requestConfig = {
        url: `condominios/update/${id}`,
        method: "put",
        data: values,
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/condominios");
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
                error={errors.nome ? true : false}
                helperText={errors.nome ? "Campo obrigatório" : ""}
                fullWidth
                disabled={onlyView}
                label="Nome"
                name="nome"
                onChange={handleChange}
                value={values.nome || ""}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("endereco", {
                  required: true,
                })}
                error={errors.endereco ? true : false}
                helperText={errors.endereco ? "Campo obrigatório" : ""}
                fullWidth
                disabled={onlyView}
                label="Endereço"
                name="endereco"
                onChange={handleChange}
                required
                variant="outlined"
                value={values.endereco || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("cidade", {
                  required: true,
                })}
                error={errors.cidade ? true : false}
                helperText={errors.cidade ? "Campo obrigatório" : ""}
                fullWidth
                disabled={onlyView}
                label="Cidade"
                name="cidade"
                onChange={handleChange}
                required
                variant="outlined"
                value={values.cidade || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("uf", {
                  required: true,
                })}
                error={errors.uf ? true : false}
                helperText={errors.uf ? "Campo obrigatório" : ""}
                fullWidth
                disabled={onlyView}
                label="UF"
                name="uf"
                required
                onChange={handleChange}
                variant="outlined"
                value={values.uf || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("cep", {
                  required: true,
                })}
                error={errors.cep ? true : false}
                helperText={errors.cep ? "Campo obrigatório" : ""}
                fullWidth
                disabled={onlyView}
                label="CEP"
                name="cep"
                onChange={handleChange}
                required
                variant="outlined"
                value={values.cep || ""}
                InputProps={{
                  inputComponent: TextMaskCustom,
                  inputProps: {
                    mask: "00000-000",
                  },
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("codigoCondominio", {
                  required: true,
                })}
                error={errors.codigoCondominio ? true : false}
                helperText={
                  errors.codigoCondominio
                    ? "Campo obrigatório"
                    : "Utilizado para novos moradores se cadastrarem"
                }
                fullWidth
                disabled={onlyView}
                label="Código Condomínio"
                name="codigoCondominio"
                onChange={handleChange}
                required
                variant="outlined"
                value={values.codigoCondominio || ""}
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
          {!onlyView ? (
            <>
              <Button
                name="cancel"
                color="error"
                variant="contained"
                onClick={() => Router.replace("/condominios")}
              >
                Cancelar
              </Button>
              <Button name="save" color="primary" variant="contained" type="submit">
                Salvar
              </Button>
            </>
          ) : (
            <Button
              name="back"
              color="primary"
              variant="contained"
              onClick={() => Router.replace("/condominios")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
