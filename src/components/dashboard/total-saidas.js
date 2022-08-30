import { Avatar, Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { formatarMoeda } from "../../utils";
import { useEffect, useState } from "react";
import api from "../../services/api";

export const TotalSaidas = (props) => {
  const [loading, setLoading] = useState(true);
  const [totalSaidas, setTotalSaidas] = useState(0);
  useEffect(async () => {
    await api
      .get("caixa/total-saidas")
      .then((res) => {
        res.data && setTotalSaidas(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              SAÍDAS
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {loading ? <CircularProgress size={25} /> : formatarMoeda(totalSaidas)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <ArrowDownwardIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Total saídas
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
