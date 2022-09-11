import { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import Router from "next/router";

export const PerfilSenha = (props) => {
  const {
    handleSubmit,
  } = useForm();
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  async function onSubmit() {
    const { confirm, password } = values;
    if(confirm != password){
      return toast.error("Senhas estão diferentes, por favor verifique e tente novamente")
    }
    let requestConfig = {
      url: `usuarios/update-senha`,
      method: "put",
      data: {novaSenha:password},
    };
    await api(requestConfig)
      .then(() => {
        toast.success(`Senha alterada com sucesso`);
        Router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível alterar a senha, tente novamente mais tarde");
      });
  }

  return (
    <form {...props} onSubmit={handleSubmit(() => onSubmit())}>
      <Card>
        <CardHeader
          subheader="Caso deseje alterar a senha, informe uma nova abaixo"
          title="Nova Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Senha"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar Senha"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Atualizar Senha
          </Button>
        </Box>
      </Card>
    </form>
  );
};
