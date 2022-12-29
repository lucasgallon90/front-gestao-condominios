import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatarMoeda } from "../../utils/index";
import DialogSaldoInicialCaixa from "./dialog-saldo-caixa-inicial";
import EditIcon from "@mui/icons-material/Edit";

export const SaldoDeCaixa = () => {
  const [loading, setLoading] = useState(true);
  const [openDialogSaldoInicial, setOpenDialogSaldoInicial] = useState(false);
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [saldoInicial, setSaldoInicial] = useState(0);

  useEffect(() => {
    loadSaldoAtual();
  }, []);

  const loadSaldoAtual = async () => {
    setLoading(true);
    await api
      .get("caixa/saldo-atual")
      .then((res) => {
        setSaldoAtual(res.data.saldoCaixaAtual);
        setSaldoInicial(res.data.saldoCaixaInicial);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <DialogSaldoInicialCaixa
        saldoInicial={saldoInicial}
        open={openDialogSaldoInicial}
        setOpen={setOpenDialogSaldoInicial}
        refreshData={loadSaldoAtual}
      ></DialogSaldoInicialCaixa>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                SALDO CAIXA
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {loading ? <CircularProgress size={25} /> : formatarMoeda(saldoAtual)}
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
            <Grid item xs={12}>
              {!saldoAtual ? (
                <Button variant="outlined" onClick={() => setOpenDialogSaldoInicial(true)}>
                  Informar saldo inicial de caixa
                </Button>
              ) : (
                <div>
                  <Typography color="textSecondary" variant="caption">
                    Saldo Inicial: {formatarMoeda(saldoInicial)}
                  </Typography>
                  <IconButton onClick={() => setOpenDialogSaldoInicial(true)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
