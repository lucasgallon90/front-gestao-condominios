import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import { Avatar, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatarMoeda } from "../../utils/index";
import DialogSaldoInicialCaixa from "./dialog-saldo-caixa-inicial";

export const SaldoDeCaixa = (props) => {
  const [openDialogSaldoInicial, setOpenDialogSaldoInicial] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState(0);

  useEffect(async () => {
    await api
      .get("caixa/saldo-atual")
      .then((res) => {
        res.data && setSaldoAtual(res.data.saldoCaixaAtual);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <DialogSaldoInicialCaixa
        open={openDialogSaldoInicial}
        setOpen={setOpenDialogSaldoInicial}
      ></DialogSaldoInicialCaixa>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                SALDO CAIXA
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {formatarMoeda(saldoAtual)}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "warning.main",
                  height: 56,
                  width: 56,
                }}
              >
                <InsertChartIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={() => setOpenDialogSaldoInicial(true)}>
                Informar saldo inicial de caixa
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
