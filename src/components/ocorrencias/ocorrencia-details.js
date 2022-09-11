import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/authContext";
import api from "../../services/api";
import toast from "react-hot-toast";

export const OcorrenciaDetails = ({ id, operation, onlyView }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({
    _idUsuarioOcorrencia: undefined,
    nome: undefined,
    motivo: undefined,
    descricao: undefined,
    situacao: "Aberta",
    respostaAdmin: undefined,
  });
  const [moradores, setMoradores] = useState([]);

  useEffect(() => {
    if (user) {
      operation != "add" && getOcorrencia();
      if (user?.tipoUsuario === "admin") {
        getMoradores();
      } else {
        setValues({ ...values, nome: user.nome, _idUsuarioOcorrencia: user._id });
        reset(values);
      }
    }
  }, [user]);

  async function getOcorrencia() {
    await api
      .get(`ocorrencias/${id}`)
      .then((res) => {
        res.data &&
          setValues({
            _idUsuarioOcorrencia: res.data._idUsuarioOcorrencia,
            nome: res.data.usuarioOcorrencia.nome,
            motivo: res.data.motivo,
            descricao: res.data.descricao,
            situacao: res.data.situacao,
            respostaAdmin: res.data.respostaAdmin,
          });
        reset(values);
      })
      .catch((error) => console.log(error));
  }

  async function getMoradores() {
    await api
      .post(`usuarios/list/moradores`)
      .then((res) => {
        res.data && setMoradores(res.data);
        if (res.data.length === 1) {
          setValues({ ...values, _idUsuarioOcorrencia: res.data[0]._id, nome: res.data[0].nome });
        }
      })
      .catch((error) => console.log(error));
  }

  async function onSubmit() {
    const { nome, ...rest } = values;
    let requestConfig = {};
    if (operation === "add") {
      requestConfig = {
        url: `ocorrencias/create`,
        method: "post",
        data: rest,
      };
    } else {
      requestConfig = {
        url: `ocorrencias/update/${id}`,
        method: "put",
        data: rest,
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
                  fullWidth
                  label="Morador"
                  name="_idUsuarioOcorrencia"
                  disabled={true}
                  required
                  value={values.nome}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                ></TextField>
              ) : (
                <TextField
                  fullWidth
                  label="Morador"
                  name="_idUsuarioOcorrencia"
                  onChange={handleChange}
                  select
                  disabled={onlyView}
                  required
                  SelectProps={{ native: true }}
                  value={values.nome}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                >
                  {moradores?.map((option) => (
                    <option key={option._id} value={option.nome}>
                      {option.nome}
                    </option>
                  ))}
                </TextField>
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
