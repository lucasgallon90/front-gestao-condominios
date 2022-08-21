import { Box, Button, Card, CardContent, Divider, Grid } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const GraficoDetails = (props) => {
  const data = [
    {
      name: "01/2022",
      entrada: 4000,
      saída: 2400,
    },
    {
      name: "02/2022",
      entrada: 3000,
      saída: 2430,
    },
    {
      name: "03/2022",
      entrada: 4000,
      saída: 2230,
    },
  ];
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
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
          <Button color="primary" variant="contained">
            Voltar
          </Button>
        </Box>
      </Card>
    </>
  );
};
