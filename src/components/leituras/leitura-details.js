import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";
import { formatarMoeda } from "../../utils";
import AutoComplete from "../common/auto-complete";
import NumericInput from "../common/numeric-input";

export const LeituraDetails = ({ id, operation, onlyView }) => {
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    morador: undefined,
    leituraAtual: 0,
    leituraAnterior: 0,
    taxaFixa: 0,
    valor: 0,
    valor: 0,
    valorTotal: 0,
    tipoLeitura: undefined,
    mesAno: moment().format("YYYY-MM"),
  });
  const [moradores, setMoradores] = useState([]);
  const [tiposLeitura, setTiposLeitura] = useState([]);

  useEffect(async () => {
    async function load() {
      let leitura;
      if (operation != "add") {
        leitura = await getLeitura();
        leitura?.morador && setMoradores([leitura.morador]);
        leitura?.tipoLeitura && setTiposLeitura([leitura.tipoLeitura]);
      } else {
        loadTiposLeitura();
        loadMoradores();
      }
    }
    load();
  }, []);

  async function getLeitura() {
    return await api
      .get(`leituras/${id}`)
      .then((res) => {
        setValues(res.data);
        reset(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  function getLeituraAnterior(values, id) {
    api
      .get(`leituras/leitura-anterior/${id}`)
      .then((res) => {
        if (res.data) {
          setValues({ ...values, leituraAnterior: res.data.leituraAtual });
        }
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (event) => {
    let newValues = { ...values, [event.target.name]: event.target.value };
    if (event.target.name === "leituraAnterior") {
      newValues = {
        ...newValues,
        valor: (values.leituraAtual - event.target.value) * values.valorUnidade,
        valorTotal:
          values.taxaFixa + (values.leituraAtual - event.target.value) * values.valorUnidade,
      };
    }
    if (event.target.name === "leituraAtual") {
      newValues = {
        ...newValues,
        valor: (event.target.value - values.leituraAnterior) * values.valorUnidade,
        valorTotal:
          values.taxaFixa + (event.target.value - values.leituraAnterior) * values.valorUnidade,
      };
    }
    setValues({ ...newValues });
  };

  const handleChangeMorador = (moradorSelecionado) => {
    if (moradorSelecionado) {
      clearErrors("morador");
      const newValues = { ...values, morador: moradorSelecionado };
      setValues(newValues);
      getLeituraAnterior(newValues, moradorSelecionado._id);
    } else {
      setValues({ ...values, leituraAnterior: 0, morador: undefined });
    }
  };

  const handleChangeTiposLeitura = (tipoLeituraSelecionada) => {
    if (tipoLeituraSelecionada) {
      clearErrors("tipoLeitura");
      setValues({
        ...values,
        taxaFixa: tipoLeituraSelecionada.taxaFixa,
        valorUnidade: tipoLeituraSelecionada.valorUnidade,
        tipoLeitura: tipoLeituraSelecionada,
      });
    } else {
      setValues({ ...values, tipoLeitura: undefined });
    }
  };

  async function loadMoradores(nomeMorador) {
    let filter = { ativo: true };
    if (nomeMorador) filter = { nome: nomeMorador, ...filter };
    return api
      .post("usuarios/list/moradores", filter)
      .then((res) => {
        setMoradores(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function loadTiposLeitura(descricao) {
    let filter = null;
    if (descricao) filter = { descricao };
    return api
      .post("tipos-leitura/list", filter)
      .then((res) => {
        setTiposLeitura(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onSubmit() {
    const { morador, tipoLeitura, _idCondominio, createdAt, updatedAt, _id, ...rest } = values;
    if (!morador) {
      setError("condominio", { type: "required", message: "Campo obrigatório" });
      return;
    }
    if (!tipoLeitura) {
      setError("tipoLeitura", { type: "required", message: "Campo obrigatório" });
      return;
    }
    let requestConfig = {};
    let data = { ...rest, _idTipoLeitura: tipoLeitura._id, _idUsuarioLeitura: morador._id };

    if (operation === "add") {
      requestConfig = {
        url: `leituras/create`,
        method: "post",
        data: data,
      };
    } else {
      requestConfig = {
        url: `leituras/update/${id}`,
        method: "put",
        data: data,
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/leituras");
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message ||
            "Não foi possível cadastrar o registro, tente novamente mais tarde"
        );
      });
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(() => onSubmit())}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <AutoComplete
                disabled={onlyView}
                label="Morador"
                data={moradores}
                selectedValue={values.morador}
                required={true}
                name={"morador"}
                errors={errors}
                optionLabel="nome"
                optionKey="_id"
                loadOptions={(nomeMorador) => loadMoradores(nomeMorador)}
                handleChangeSelectedValue={handleChangeMorador}
              ></AutoComplete>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="N° Apto / Bloco"
                name="apto"
                onChange={handleChange}
                value={`${
                  values.morador?.apto
                    ? `${values.morador?.apto}${
                        values.morador?.bloco ? `/${values.morador.bloco}` : ""
                      }`
                    : ""
                }`}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                views={["year", "month"]}
                label="Mês/Ano"
                minDate={moment().subtract(3, "years").toDate()}
                maxDate={moment().add(3, "years").toDate()}
                disabled={onlyView}
                value={moment(values.mesAno + "-01").toDate()}
                onChange={(newValue) => {
                  setValues({ ...values, mesAno: moment(newValue).format("YYYY-MM") });
                }}
                renderInput={(params) => <TextField {...params} fullWidth helperText={null} />}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AutoComplete
                disabled={onlyView}
                label="Tipo de Leitura"
                data={tiposLeitura}
                selectedValue={values.tipoLeitura}
                required={true}
                name={"tipoLeitura"}
                errors={errors}
                optionLabel="descricao"
                optionKey="_id"
                loadOptions={(descricao) => loadTiposLeitura(descricao)}
                handleChangeSelectedValue={handleChangeTiposLeitura}
              ></AutoComplete>
            </Grid>
            <Grid item md={6} xs={12}>
              <NumericInput
                fullWidth
                prefix=""
                label="Leitura Anterior"
                name="leituraAnterior"
                onChange={handleChange}
                decimalScale={3}
                required
                disabled={onlyView || !values.tipoLeitura}
                value={values.leituraAnterior}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumericInput
                fullWidth
                prefix=""
                label="Leitura Atual"
                name="leituraAtual"
                onChange={handleChange}
                decimalScale={3}
                required
                disabled={onlyView || !values.tipoLeitura}
                value={values.leituraAtual}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Taxa Fixa"
                name="taxaFixa"
                required
                onChange={handleChange}
                value={formatarMoeda(values.taxaFixa || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Unidade"
                name="valor"
                onChange={handleChange}
                disabled
                required
                value={formatarMoeda(values.valorUnidade || 0)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Leitura"
                name="valor"
                onChange={handleChange}
                disabled
                required
                value={formatarMoeda(values.valor)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Valor Total"
                name="valor"
                disabled
                required
                onChange={handleChange}
                value={formatarMoeda(values.valorTotal)}
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
                name="cancel"
                color="error"
                variant="contained"
                onClick={() => Router.replace("/leituras")}
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
              onClick={() => Router.replace("/leituras")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
