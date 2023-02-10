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
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useUser } from "../contexts/authContext";
import api from "../services/api";

const RecuperarSenha = () => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Insira um email válido").max(255).required("Campo obrigatório"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  async function handleSubmit(values) {
    const { email } = values;
    setLoading(true);
    api
      .post("usuarios/recuperar-senha", { email })
      .then((_res) => {
        toast.success(
          "Email enviado com sucesso, confira sua caixa de entrada para recuperar sua senha"
        );
        router.push("/");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Head>
        <title>Recuperar Senha | Gestão de Condomínios</title>
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
                Recuperar senha
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Informe seu email para recuperar sua senha
              </Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
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

export default RecuperarSenha;
