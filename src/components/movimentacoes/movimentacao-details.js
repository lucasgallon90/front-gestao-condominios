import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";
import AutoComplete from "../common/auto-complete";
import NumericInput from "../common/numeric-input";

export const MovimentacaoDetails = ({ id, operation, onlyView }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    descricao: "",
    valor: 0,
    tipoMovimentacao: undefined,
    ratear: false,
    dataVencimento: undefined,
    dataPagamento: undefined,
  });
  const [tiposMovimentacao, setTiposMovimentacao] = useState([]);

  useEffect(async () => {
    async function load() {
      let movimentacao;
      if (operation != "add") {
        movimentacao = await getMovimentacao();
      }
      if (!onlyView) {
        if (operation === "add") {
          loadTiposMovimentacao();
        } else {
          movimentacao?.tipoMovimentacao && setTiposMovimentacao([movimentacao.tipoMovimentacao]);
        }
      }
    }
    load();
  }, []);

  async function getMovimentacao() {
    return await api
      .get(`movimentacoes/${id}`)
      .then((res) => {
        res.data && setValues(res.data);
        reset(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  async function loadTiposMovimentacao(descricao) {
    let filter = null;
    if (descricao) filter = { descricao };
    return api
      .post("tipos-movimentacao/list", filter)
      .then((res) => {
        console.log(res.data);
        setTiposMovimentacao(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChangeTipoMovimentacao = (tipoMovimentacaoSelecionado) => {
    if (tipoMovimentacaoSelecionado) {
      clearErrors("tipoMovimentacao");
      const newValues = { ...values, tipoMovimentacao: tipoMovimentacaoSelecionado };
      setValues(newValues);
    } else {
      setValues({ ...values, tipoMovimentacao: undefined });
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  async function onSubmit() {
    const { tipoMovimentacao, createdAt, updatedAt, _idCondominio, ...rest } = values;
    if (!tipoMovimentacao) {
      setError("tipoMovimentacao", { type: "required", message: "Campo obrigatório" });
      return;
    }
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `movimentacoes/create`,
        method: "post",
        data: { ...rest, _idTipoMovimentacao: tipoMovimentacao._id },
      };
    } else {
      requestConfig = {
        url: `movimentacoes/update/${id}`,
        method: "put",
        data: { ...rest, _idTipoMovimentacao: tipoMovimentacao._id },
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/movimentacoes");
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
                fullWidth
                disabled={onlyView}
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                required
                value={values.descricao}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumericInput
                fullWidth
                label="Valor"
                name="valor"
                onChange={handleChange}
                required
                disabled={onlyView}
                value={values.valor}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AutoComplete
                disabled={onlyView}
                label="Tipos de Movimentação"
                data={tiposMovimentacao}
                selectedValue={values.tipoMovimentacao}
                required={true}
                name={"tipoMovimentacao"}
                errors={errors}
                optionLabel="descricao"
                optionKey="_id"
                loadOptions={(descricao) => loadTiposMovimentacao(descricao)}
                handleChangeSelectedValue={handleChangeTipoMovimentacao}
              ></AutoComplete>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ratear"
                name="state"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                <option key="N" value={false}>
                  Não
                </option>
                <option key="S" value={true}>
                  Sim
                </option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data Vencimento"
                name="dataVencimento"
                InputLabelProps={{ shrink: true }}
                type="date"
                onChange={handleChange}
                value={null}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data Pagamento"
                InputLabelProps={{ shrink: true }}
                name="dataPagamento"
                type="date"
                onChange={handleChange}
                value={values.dataPagamento}
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
          {!onlyView ? (
            <>
              <Button
                name="cancel"
                color="error"
                variant="contained"
                onClick={() => Router.replace("/movimentacoes")}
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
              onClick={() => Router.replace("/movimentacoes")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
