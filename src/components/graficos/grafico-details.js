import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import Router from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import { formatarData, formatarMoeda } from "../../utils";

export const GraficoDetails = ({ dataGrafico, dataInicial, dataFinal }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const legendas = { saida: "Saídas", entrada: "Entradas" };
  useEffect(() => {
    let dataAux = [];
    Object.keys(dataGrafico)?.map((key) => {
      let barra = {};
      dataGrafico[key]?.map((data) => {
        barra.name = moment(data.mesAno + "-01").format("MM/YYYY");
        if (data.tipoMovimentacao === "E") {
          barra.entrada = data.total;
        }
        if (data.tipoMovimentacao === "S") {
          barra.saida = data.total;
        }
        if (!barra.saida) {
          barra.saida = 0;
        }
        if (!barra.entrada) {
          barra.entrada = 0;
        }
      });
      dataAux.push(barra);
    });
    setData(dataAux);
    setLoading(false);
  }, []);

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{legendas[value]}</span>;
  };

  return (
    <>
      <Card>
        <CardHeader title={`Período : ${formatarData(dataInicial)} à ${formatarData(dataFinal)}`} />
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {data?.length === 0 && (
              <>
                <Box>
                  {loading ? (
                    <>
                      Carregando...
                      <LinearProgress />
                    </>
                  ) : (
                    "Nâo foram encontrados registros para o período selecionado"
                  )}
                </Box>
              </>
            )}
            {data?.length > 0 && (
              <BarChart
                width={1200}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value)=>formatarMoeda(value)} />
                <Tooltip
                  formatter={(value, name, props) => [formatarMoeda(value), legendas[name]]}
                />
                <Legend formatter={renderColorfulLegendText} />
                <Bar dataKey="entrada" fill="#82ca9d" />
                <Bar dataKey="saida" fill="#e74c3c" />
              </BarChart>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            disabled={loading}
            color="primary"
            variant="contained"
            onClick={() => Router.back()}
          >
            Voltar
          </Button>
        </Box>
      </Card>
    </>
  );
};
