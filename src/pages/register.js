import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../contexts/authContext";
import * as Yup from "yup";
import { Google as GoogleIcon } from "../icons/google";
import nookies from "nookies";
import toast from "react-hot-toast";

const Register = ({ googleId, email }) => {
  const user = useUser();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: email || "",
      nome: "",
      telefone: "",
      apto: "",
      senha: "",
      codigoCondominio: "",
      apto: "",
      bloco: "",
      googleId: googleId,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Insira um email válido").max(255).required("Campo obrigatório"),
      nome: Yup.string().max(255).required("Campo obrigatório"),
      apto: Yup.string().max(255).required("Campo obrigatório"),
      bloco: Yup.string().max(255),
      telefone: Yup.string().max(11),
      senha: !googleId ? Yup.string().max(32).required("Campo obrigatório") : Yup.string().max(32),
      confirmacaoSenha: !googleId
        ? Yup.string().max(32).required("Campo obrigatório")
        : Yup.string().max(32),
      codigoCondominio: Yup.string().max(255).required("Campo obrigatório"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSubmitRegister(values, setSubmitting);
    },
  });

  async function handleSubmitRegister(values, setSubmitting) {
    const { confirmacaoSenha, ...rest } = values;
    const result = await user.register(rest);
    if (!result) {
      setSubmitting(false);
    } else {
      router.push("/");
    }
  }

  function handleClickGoogle() {
    window.open(`${process.env.NEXT_PUBLIC_API}auth/register/google`, "_self");
  }

  return (
    <>
      <Head>
        <title>Registrar | Gestão de Condomínios</title>
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
            <Box style={{ justifyContent: "center", display: "flex", marginBottom: 10 }}>
              <div style={{ maxWidth: "100%" }}>
                <img width={250} src="/static/logo_large.png" />
              </div>
            </Box>
            <Box>
              <Typography color="textPrimary" variant="h4">
                Criar uma nova conta
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {!googleId
                  ? "Para cadastrar-se com o email do google clique primeiramente no botão abaixo"
                  : "Cadastro iniciado através do email do google. Preencha o restante dos dados abaixo para finalizar"}
              </Typography>
            </Box>
            {!googleId && (
              <>
                <Grid container spacing={3} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      color="error"
                      startIcon={<GoogleIcon />}
                      onClick={handleClickGoogle}
                      size="large"
                      variant="contained"
                    >
                      Google
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <TextField
                  error={Boolean(formik.touched.codigoCondominio && formik.errors.codigoCondominio)}
                  fullWidth
                  helperText={formik.touched.codigoCondominio && formik.errors.codigoCondominio}
                  label="Código do Condomínio"
                  name="codigoCondominio"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.codigoCondominio}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.nome && formik.errors.nome)}
                  fullWidth
                  helperText={formik.touched.nome && formik.errors.nome}
                  label="Nome"
                  name="nome"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nome}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.apto && formik.errors.apto)}
                  fullWidth
                  helperText={formik.touched.apto && formik.errors.apto}
                  label="N° Apartamento"
                  name="apto"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.apto}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.telefone}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  disabled={googleId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
              </Grid>
              {!googleId && (
                <>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(formik.touched.senha && formik.errors.senha)}
                      fullWidth
                      helperText={formik.touched.senha && formik.errors.senha}
                      label="Senha"
                      name="senha"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="senha"
                      value={formik.values.senha}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(
                        formik.touched.confirmacaoSenha && formik.errors.confirmacaoSenha
                      )}
                      fullWidth
                      helperText={formik.touched.confirmacaoSenha && formik.errors.confirmacaoSenha}
                      label="Confirmação Senha"
                      name="confirmacaoSenha"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="confirmacaoSenha"
                      value={formik.values.confirmacaoSenha}
                      variant="outlined"
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Cadastrar-se
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Já possui uma conta?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Login
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;

export async function getServerSideProps({ query }) {
  let props = {
    googleId: query.id || null,
    email: query.email || null,
  };
  return { props };
}
