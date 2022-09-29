import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";
import { formatarMoeda } from "../../utils";
import NumericInput from "../common/numeric-input";

export const TipoLeituraDetails = ({ id, operation, onlyView }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    descricao: undefined,
    unidadeMedida: undefined,
    taxaFixa: 0,
    valorUnidade: 0,
  });

  useEffect(() => {
    operation != "add" && getTipoLeitura();
  }, []);

  async function getTipoLeitura() {
    await api
      .get(`tipos-leitura/${id}`)
      .then((res) => {
        res.data &&
          setValues({
            descricao: res.data.descricao,
            unidadeMedida: res.data.unidadeMedida,
            taxaFixa: res.data.taxaFixa,
            valorUnidade: res.data.valorUnidade,
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
        url: `tipos-leitura/create`,
        method: "post",
        data: values,
      };
    } else {
      requestConfig = {
        url: `tipos-leitura/update/${id}`,
        method: "put",
        data: values,
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/tipos-leitura");
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
                label="Descrição"
                required
                name="descricao"
                onChange={handleChange}
                value={values.descricao || ""}
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
                value={values.unidadeMedida || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumericInput
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
              <NumericInput
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
          {!onlyView ? (
            <>
              <Button
                color="error"
                variant="contained"
                onClick={() => Router.replace("/tipos-leitura")}
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
