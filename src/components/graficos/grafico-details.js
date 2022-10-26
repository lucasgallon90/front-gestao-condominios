import { Box, Button, Card, CardContent, Divider, Grid } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import Router from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";

export const GraficoDetails = ({ dataGrafico }) => {
  const [data, setData] = useState([]);
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
          barra.saída = data.total;
        }
      });
      dataAux.push(barra);
    });
    setData(dataAux);
  }, []);
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
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
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entrada" fill="#82ca9d" />
                <Bar dataKey="saída" fill="#e74c3c" />
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
          <Button color="primary" variant="contained" onClick={() => Router.back()}>
            Voltar
          </Button>
        </Box>
      </Card>
    </>
  );
};
