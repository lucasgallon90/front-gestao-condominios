import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";

export const TipoMovimentacaoDetails = ({ id, operation, onlyView }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    descricao: undefined,
    tipo: "E",
    gerarCobranca: false,
  });

  useEffect(() => {
    reset({ ...values});
    operation != "add" && getTipoMovimentacao();
  }, []);

  async function getTipoMovimentacao() {
    await api
      .get(`tipos-movimentacao/${id}`)
      .then((res) => {
        res.data &&
          setValues({
            descricao: res.data.descricao,
            tipo: res.data.tipo,
            gerarCobranca: res.data.gerarCobranca,
          });
        reset({ ...res.data });
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (event) => {
    let newValues = { ...values };
    newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };
    if (event.target.name === "tipo" && event.target.value === "E" && values.gerarCobranca) {
      newValues = { ...newValues, gerarCobranca: false };
    }
    setValues({ ...newValues });
    reset({ ...newValues});
  };

  async function onSubmit() {
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `tipos-movimentacao/create`,
        method: "post",
        data: values,
      };
    } else {
      requestConfig = {
        url: `tipos-movimentacao/update/${id}`,
        method: "put",
        data: values,
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/tipos-movimentacao");
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
                {...register("descricao", {
                  required: true,
                })}
                error={errors.descricao ? true : false}
                helperText={errors.descricao ? "Campo obrigatório" : ""}
                fullWidth
                disabled={onlyView}
                required
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                value={values.descricao || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo"
                disabled={onlyView}
                name="tipo"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.tipo}
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Gerar Cobrança"
                disabled={onlyView || values.tipo === "E"}
                name="gerarCobranca"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.gerarCobranca}
                variant="outlined"
              >
                <option key="S" value={true}>
                  Sim
                </option>
                <option key="N" value={false}>
                  Não
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
                onClick={() => Router.replace("/tipos-movimentacao")}
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
              onClick={() => Router.replace("/tipos-movimentacao")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
