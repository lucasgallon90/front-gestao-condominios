import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound = () => (
  <>
    <Head>
      <title>404 | Gestão de Condomínios</title>
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
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" color="textPrimary" variant="h1">
            404: A página que você procura não existe
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            A página que você está tentando acessar não foi encontrada, clique no botão abaixo para
            retornar ao painel administrativo
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="Não encontrada"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Voltar ao painel
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
