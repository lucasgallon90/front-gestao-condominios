import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import moment from "moment";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from "sweetalert2";
import { useUser } from "../../contexts/authContext";
import api from "../../services/api";
import { formatarMoeda } from "../../utils/index";
import { printPDF } from "../../utils/print-pdf-cobranca";
import AutoComplete from "../common/auto-complete";
import NumericInput from "../common/numeric-input";

export const CobrancaDetails = ({ id, operation, onlyView }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    descricao: "",
    valor: 0,
    dataVencimento: undefined,
    dataPagamento: undefined,
    mesAno: format(new Date(), "yyyy-MM"),
    morador: undefined,
  });
  const [moradores, setMoradores] = useState([]);

  useEffect(() => {
    async function load() {
      let cobranca;
      if (user) {
        if (operation != "add") {
          cobranca = await getCobranca();
          cobranca?.morador && setMoradores([cobranca.morador]);
        } else {
          loadMoradores();
        }
      }
    }
    load();
  }, [user]);

  async function getCobranca() {
    return await api
      .get(`cobrancas/${id}`)
      .then((res) => {
        setValues({ ...res.data });
        reset({ ...res.data });
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  async function loadMoradores(nome) {
    let filter = { ativo: true };
    if (nome) filter = { nome: nome, ...filter };
    return api
      .post(`usuarios/list/moradores`, filter)
      .then((res) => {
        setMoradores(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function loadContasLeituras() {
    Swal.fire({
      title: "Carregando...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await api
      .post(`cobrancas/contas-leituras-rateio`, {
        _idUsuario: values.morador._id,
        mesAno: values.mesAno,
      })
      .then((res) => {
        const itemsCobranca = [...res.data.leituras, ...res.data.contas];
        const valorTotal = itemsCobranca.reduce((accumulator, item) => {
          return accumulator + item.valor;
        }, 0);
        setValues({ ...values, itemsCobranca, valor: valorTotal });
        toast.success("Contas/leituras carregadas com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível carregar as contas/leituras, tente novamente mais tarde!");
      })
      .finally(() => Swal.close());
  }

  const handleChange = (event) => {
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

  const handleClickImprimir = () => {
    const pdf = printPDF({
      title: "Cobrança",
      header: [
        { label: "Nome", value: values.morador.nome },
        {
          label: `Apto${values.morador.bloco ? "/Bloco" : ""}`,
          value: values.morador.bloco
            ? `${values.morador.apto}/${values.morador.bloco}`
            : values.morador.apto,
        },
        {
          label: "Descrição",
          value: values.descricao,
        },
        {
          label: "Data Vencimento",
          value: values.dataVencimento ? moment(values.dataVencimento).format("DD/MM/YY") : "-",
        },
        {
          label: "Data Pagamento",
          value: values.dataPagamento ? moment(values.dataPagamento).format("DD/MM/YY") : "-",
        },
        {
          label: "Mês/Ano",
          value: moment(values.mesAno + "-01").format("MM/YYYY"),
        },
      ],
      columnHead: [
        {
          label: "Conta/Leitura",
          key: "_idMovimentacao",
          format: (value) => (value ? "Conta" : "Leitura"),
        },
        { label: "Descrição", key: "descricao" },
        { label: "Leitura", groupKey: ["leitura", "unidadeMedida"], key: "leitura" },
        {
          label: "Valor Conta Rateada / Leitura",
          key: "valor",
          format: (value) => formatarMoeda(value),
        },
      ],
      data: values.itemsCobranca,
      total: formatarMoeda(values.valor),
    });
    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const blankWindow = window.open();
    blankWindow.location.href = url;
  };

  async function onSubmit() {
    const { morador, createdAt, updatedAt, _idCondominio, _id, ...rest } = values;
    if (!morador) {
      setError("morador", { type: "required", message: "Campo obrigatório" });
      return;
    }
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `cobrancas/create`,
        method: "post",
        data: { ...rest, _idUsuarioCobranca: morador._id },
      };
    } else {
      const updateData = rest.itemsCobranca?.map((item) => {
        const { createdAt, updatedAt, _idCondominio, _idCobranca, _id, ...rest } = item;
        return rest;
      });
      requestConfig = {
        url: `cobrancas/update/${id}`,
        method: "put",
        data: { ...rest, itemsCobranca: updateData, _idUsuarioCobranca: morador._id },
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/cobrancas");
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
                required
                disabled={onlyView}
                onChange={handleChange}
                label="Descrição"
                name="descricao"
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
              <DatePicker
                label="Data Vencimento"
                name="dataVencimento"
                variant="outlined"
                disabled={onlyView}
                value={values.dataVencimento || null}
                onChange={(value) => handleChange({ target: { name: "dataVencimento", value } })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                label="Data Pagamento"
                name="dataPagamento"
                variant="outlined"
                disabled={onlyView}
                value={values.dataPagamento || null}
                onChange={(value) => handleChange({ target: { name: "dataPagamento", value } })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Typography
                sx={{ justifyContent: "center", display: "flex", textAlign: "center" }}
                variant="subtitle"
              >
                Selecione o morador e o mês/ano para carregar as contas a ratear e leituras
                correspondentes
              </Typography>
            </Grid>
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
              <DatePicker
                views={["year", "month"]}
                label="Mês/Ano*"
                minDate={moment().subtract(3, "years").toDate()}
                maxDate={moment().add(3, "years").toDate()}
                disabled={onlyView}
                value={values.mesAno ? moment(values.mesAno + "-01").toDate() : undefined}
                onChange={(newValue) => {
                  setValues({
                    ...values,
                    mesAno: newValue ? format(new Date(newValue), "yyyy-MM") : undefined,
                  });
                }}
                renderInput={(params) => <TextField {...params} fullWidth helperText={null} />}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            {!onlyView && (
              <Button
                color="primary"
                variant="contained"
                disabled={!values.morador}
                onClick={loadContasLeituras}
              >
                Carregar
              </Button>
            )}
          </Box>
        </CardContent>
        <Divider />
        <PerfectScrollbar>
          <Box>
            <TableContainer component={Paper}>
              <Typography sx={{ margin: 1 }} variant="h6" id="tableTitle" component="div">
                Contas
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Conta / Leitura</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Medida Leitura</TableCell>
                    <TableCell>Valor Conta Rateada / Valor Leitura</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.itemsCobranca?.map((item) => (
                    <TableRow hover key={item._id}>
                      <TableCell>
                        {item._idLeitura ? (
                          <Chip color="info" label="Leitura"></Chip>
                        ) : (
                          <Chip color="error" label="Conta"></Chip>
                        )}
                      </TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell>
                        {item._idLeitura ? item.leitura + " " + item.unidadeMedida : "-"}
                      </TableCell>
                      <TableCell>{formatarMoeda(item.valor)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          {operation != "add" && (
            <Button color="primary" variant="contained" onClick={handleClickImprimir}>
              Imprimir
            </Button>
          )}
          {!onlyView ? (
            <>
              <Button
                name="cancel"
                color="error"
                variant="contained"
                onClick={() => Router.replace("/cobrancas")}
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
              onClick={() => Router.replace("/cobrancas")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
