import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
          <Button color="primary" variant="contained">
            Imprimir
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => Router.replace("/movimentacoes")}
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
