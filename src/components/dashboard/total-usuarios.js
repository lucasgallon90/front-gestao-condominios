import { Avatar, Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Users as UsersIcon } from "../../icons/users";
import api from "../../services/api";

export const TotalUsuarios = (props) => {
  const [loading, setLoading] = useState(true);
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(async () => {
    await api
      .get("usuarios/count/total")
      .then((res) => {
        res.data && setTotalUsuarios(res.data.total);
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
              Usuários
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {loading ? <CircularProgress size={25} /> : totalUsuarios}
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
              <UsersIcon />
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
