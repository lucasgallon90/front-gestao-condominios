import { Avatar, Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import api from "../../services/api";
import { useEffect, useState } from "react";

export const TotalCondominios = (props) => {
  const [loading, setLoading] = useState(true);
  const [totalCondominios, setTotalCondominios] = useState(0);

  useEffect(async () => {
    await api
      .get("condominios/count/total")
      .then((res) => {
        res.data && setTotalCondominios(res.data.total);
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
              Condomínios
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {loading ? <CircularProgress size={25} /> : totalCondominios}
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
              <ApartmentIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        ></Box>
      </CardContent>
    </Card>
  );
};
