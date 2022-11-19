import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useUser } from "../contexts/authContext";
import api from "../services/api";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";

const NovaSenha = ({ token }) => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      senha: "",
      confirmacaoSenha: "",
    },
    validationSchema: Yup.object({
      senha: Yup.string().max(36).required("Campo obrigatório"),
      confirmacaoSenha: Yup.string()
        .max(36)
        .required("Campo obrigatório")
        .oneOf([Yup.ref("senha"), null], "Senhas devem ser iguais"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  useEffect(() => {
    if (token) {
      let currentDate = new Date();
      let decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        toast.error(
          "Token expirado, realize o reenviou do email de recuperação de senha novamente"
        );
        router.push("/login");
      } else {
      }
    } else {
      toast.error(
        "Token não encontrado, realize o reenviou do email de recuperação de senha novamente"
      );
      router.push("/login");
    }
  }, [token]);

  async function handleSubmit(values) {
    const { senha } = values;
    setLoading(true);
    api
      .put(
        "/usuarios/update-senha",
        { novaSenha: senha },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res.data?.message);
        router.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error?.data?.message || "Ocorreu um erro ao atualizar a senha, tente novamente mais tarde"
        );
      });
  }

  return (
    <>
      <Head>
        <title>Cadastro de nova senha | Gestão de Condomínios</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ justifyContent: "center", display: "flex", marginBottom: 5 }}>
              <div sx={{ maxWidth: "100%" }}>
                <img width={250} src="/static/logo_large.png" />
              </div>
            </Box>
            <Box sx={{ marginBottom: 5 }}>
              <Typography color="textPrimary" variant="h4">
                Cadastrar nova senha
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Informe uma senha nova abaixo
              </Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <TextField
                  error={Boolean(formik.touched.senha && formik.errors.senha)}
                  fullWidth
                  helperText={formik.touched.senha && formik.errors.senha}
                  label="Senha"
                  name="senha"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.senha}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  error={Boolean(formik.touched.confirmacaoSenha && formik.errors.confirmacaoSenha)}
                  fullWidth
                  helperText={formik.touched.confirmacaoSenha && formik.errors.confirmacaoSenha}
                  label="Confirmação de senha"
                  name="confirmacaoSenha"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirmacaoSenha}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {loading && <CircularProgress size={14} />}
                {!loading && "Recuperar"}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover" disabled={loading}>
                  Voltar
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default NovaSenha;

export async function getServerSideProps({ query }) {
  let props = {
    token: query.token || null,
  };
  return { props };
}
