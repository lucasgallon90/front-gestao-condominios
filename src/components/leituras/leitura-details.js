import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Box, Button, Card, CardContent, Divider, Grid, TextField } from "@mui/material";
import ptLocale from "date-fns/locale/pt-BR";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/api";
import { formatarDecimal, formatarMoeda } from "../../utils";
import AutoComplete from "../common/auto-complete";
import NumericInput from "../common/numeric-input";

export const LeituraDetails = ({ id, operation, onlyView }) => {
  const {
    register,
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
    valor: undefined,
    tipoLeitura: undefined,
    mesAno: new Date(),
  });
  const [moradores, setMoradores] = useState([]);
  const [tiposLeitura, setTiposLeitura] = useState([]);

  useEffect(async () => {
    async function load() {
      let usuario;
      if (operation != "add") {
        usuario = await getLeitura();
      }
      if (!onlyView) {
        if (operation === "add") {
          loadTiposLeitura();
          const res = await loadMoradores();
          if (res?.length > 0) {
            setValues({ ...values, morador: res[0] });
          }
        } else {
          usuario?.morador && setMoradores([usuario.morador]);
        }
      }
    }
    load();
  }, []);

  async function getLeitura() {
    return await api
      .get(`leituras/${id}`)
      .then((res) => {
        res.data && setValues(res.data);
        reset(res.data);
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (event) => {
    if (["leituraAnterior", "leituraAtual"].includes(event.target.name)) {
      setValues(
        {
          valorTotal:
            values.taxaFixa + (values.leituraAnterior - values.leituraAtual) * values.valor,
        },
        ...values
      );
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeMorador = (moradorSelecionado) => {
    if (moradorSelecionado) {
      clearErrors("morador");
      setValues({ ...values, morador: moradorSelecionado });
    } else {
      setValues({ ...values, morador: undefined });
    }
  };

  const handleChangeTiposLeitura = (tipoLeituraSelecionada) => {
    if (tipoLeituraSelecionada) {
      clearErrors("tipoLeitura");
      setValues({ ...values, tipoLeitura: tipoLeituraSelecionada });
    } else {
      setValues({ ...values, tipoLeitura: undefined });
    }
  };

  async function loadMoradores(nomeMorador) {
    let filter = null;
    if (nomeMorador) filter = { nome: nomeMorador };
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

  return (
    <form autoComplete="off" noValidate>
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
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                <DatePicker
                  views={["year", "month"]}
                  label="Mês/Ano"
                  minDate={new Date("2012-03-01")}
                  maxDate={new Date("2023-06-01")}
                  disabled={onlyView}
                  value={values.mesAno}
                  onChange={(newValue) => {
                    setValues({ ...values, mesAno: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth helperText={null} />}
                />
              </LocalizationProvider>
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
                required
                disabled={onlyView}
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
                required
                disabled={onlyView}
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
                value={formatarMoeda(values.tipoLeitura?.taxaFixa || 0)}
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
                value={formatarMoeda(values.tipoLeitura?.valorUnidade || 0)}
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
                value={formatarMoeda(values.valor || 0)}
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
                value={formatarMoeda(values.valor + values.tipoLeitura?.taxaFixa || 0)}
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
          <Button color="error" variant="contained" onClick={() => Router.replace("/leituras")}>
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
