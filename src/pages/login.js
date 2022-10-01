import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Google as GoogleIcon } from "../icons/google";
import { useUser } from "../contexts/authContext";
import { useEffect, useState } from "react";

const Login = () => {
  const [failedOAuth, setFailedOauth] = useState(null);
  const [lembrarMe, setLembrarMe] = useState(true);
  const user = useUser();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Informe um email válido").max(255).required("Email é obrigatório"),
      senha: Yup.string().max(255).required("Senha é obrigatória"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSubmitLogin(values, setSubmitting);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("gc.email")) {
      formik.setFieldValue("email", localStorage.getItem("gc.email"));
    }
    if (router.query?.failedlogin) {
      setFailedOauth(router.query);
    }
  }, [router.query]);

  async function handleSubmitLogin(values, setSubmitting) {
    const result = await user.signIn(values);
    if (!result) {
      setSubmitting(false);
    } else {
      if (lembrarMe) {
        localStorage.setItem("gc.email", values.email);
      }
      router.push("/");
    }
  }

  function handleClickGoogle() {
    window.open(`${process.env.NEXT_PUBLIC_API}auth/login/google`, "_self");
  }

  function handleCheckLembrarMe() {
    setLembrarMe(!lembrarMe);
  }

  return (
    <>
      <Head>
        <title>Login | Gestão de Condomínios</title>
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
            <Box style={{ justifyContent: "center", display: "flex" }}>
              <div style={{ maxWidth: "100%" }}>
                <img width={250} src="/static/logo_large.png" />
              </div>
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Login
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Informe seus dados para acessar o sistema
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={handleClickGoogle}
                  size="large"
                  variant="contained"
                >
                  Login com Google
                </Button>
              </Grid>
              <Grid item xs={12} md={12}>
                {failedOAuth && (
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", justifyContent: "center", color: "red" }}
                  >
                    Email não encontrado!
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                ou faça login com seu email
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.senha && formik.errors.senha)}
              fullWidth
              helperText={formik.touched.senha && formik.errors.senha}
              label="Senha"
              margin="normal"
              name="senha"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.senha}
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary" checked={lembrarMe} onChange={handleCheckLembrarMe} />
              }
              label="Lembrar-me"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Entrar
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Não tem uma conta?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Cadastre-se
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
