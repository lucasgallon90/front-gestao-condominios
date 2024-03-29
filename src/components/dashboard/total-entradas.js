import { Avatar, Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { formatarMoeda } from "../../utils";

export const TotalEntradas = () => {
  const [loading, setLoading] = useState(true);
  const [totalEntradas, setTotalEntradas] = useState(0);
  useEffect(async () => {
    await api
      .get("caixa/total-entradas")
      .then((res) => {
          res.data && setTotalEntradas(res.data.total);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              ENTRADAS
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {loading ? <CircularProgress size={25} /> : formatarMoeda(totalEntradas)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <ArrowUpwardIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Total de entradas
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
