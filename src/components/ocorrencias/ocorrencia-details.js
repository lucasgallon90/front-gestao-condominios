import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/authContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import AutoComplete from "../common/auto-complete";

export const OcorrenciaDetails = ({ id, operation, onlyView }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    motivo: undefined,
    descricao: undefined,
    situacao: "Aberta",
    respostaAdmin: undefined,
  });
  const [moradores, setMoradores] = useState([]);

  useEffect(() => {
    async function load() {
      let ocorrencia;
      if (user) {
        if (operation != "add") {
          ocorrencia = await getOcorrencia();
          if (user?.tipoUsuario === "admin") {
            ocorrencia?.usuarioOcorrencia && setMoradores([ocorrencia.usuarioOcorrencia]);
          }
        } else {
          if (user?.tipoUsuario === "admin") {
            if (!onlyView) {
              const res = await loadMoradores();
              setValues({ ...values, usuarioOcorrencia: res[0] });
            }
          }
        }
      }
    }
    load();
  }, [user]);

  async function getOcorrencia() {
    return await api
      .get(`ocorrencias/${id}`)
      .then((res) => {
        res.data &&
          setValues({
            usuarioOcorrencia: res.data.usuarioOcorrencia,
            motivo: res.data.motivo,
            descricao: res.data.descricao,
            situacao: res.data.situacao,
            respostaAdmin: res.data.respostaAdmin,
          });
        reset(values);
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  async function loadMoradores(nome) {
    let filter = null;
    if (nome) filter = { nome: nome };
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

  async function onSubmit() {
    const { usuarioOcorrencia, ...rest } = values;
    if (!usuarioOcorrencia) {
      setError("usuarioOcorrencia", { type: "required", message: "Campo obrigatório" });
      return;
    }
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `ocorrencias/create`,
        method: "post",
        data: { ...rest, _idUsuarioOcorrencia: usuarioOcorrencia._id },
      };
    } else {
      requestConfig = {
        url: `ocorrencias/update/${id}`,
        method: "put",
        data: { ...rest, _idUsuarioOcorrencia: usuarioOcorrencia._id },
      };
    }
    await api(requestConfig)
      .then(() => {
        toast.success(`Registro ${operation === "add" ? "cadastrado" : "atualizado"} com sucesso`);
        Router.push("/ocorrencias");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível cadastrar o registro, tente novamente mais tarde");
      });
  }

  const handleChangeMorador = (moradorSelecionado) => {
    if (moradorSelecionado) {
      clearErrors("usuarioOcorrencia");
      setValues({ ...values, usuarioOcorrencia: moradorSelecionado });
    } else {
      setValues({ ...values, usuarioOcorrencia: undefined });
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(() => onSubmit())}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {user?.tipoUsuario != "admin" ? (
                <TextField
                  value={values.nome}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              ) : (
                <AutoComplete
                  disabled={onlyView}
                  label="Morador"
                  data={moradores}
                  selectedValue={values.usuarioOcorrencia}
                  required={true}
                  name="usuarioOcorrencia"
                  errors={errors}
                  optionLabel="nome"
                  optionKey="_id"
                  loadOptions={(nome) => loadMoradores(nome)}
                  handleChangeSelectedValue={handleChangeMorador}
                ></AutoComplete>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                {...register("motivo", {
                  required: true,
                })}
                fullWidth
                disabled={onlyView}
                label="Motivo"
                name="motivo"
                onChange={handleChange}
                required
                value={values.motivo || ""}
                variant="outlined"
                error={errors.motivo ? true : false}
                helperText={errors.motivo ? "Campo obrigatório" : ""}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled={onlyView}
                label="Descrição Detalhada"
                name="descricao"
                multiline
                rows={3}
                onChange={handleChange}
                value={values.descricao}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Situação"
                name="situacao"
                onChange={handleChange}
                select
                disabled={onlyView}
                SelectProps={{ native: true }}
                value={values.situacao}
                variant="outlined"
              >
                {["Aberta", "Resolvida", "Não Resolvida", "Pendente", "Em progresso"].map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled={operation === "view" || operation === "add"}
                label="Resposta (Administrador)"
                name="respostaAdmin"
                onChange={handleChange}
                value={values.respostaAdmin || ""}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          ></Box>
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
                onClick={() => Router.replace("/ocorrencias")}
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
              onClick={() => Router.replace("/ocorrencias")}
            >
              Voltar
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};
