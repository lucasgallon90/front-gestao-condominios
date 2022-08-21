import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Users as UsersIcon } from "../../icons/users";

export const TotalUsuarios = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Usuários
          </Typography>
          <Typography color="textPrimary" variant="h5">
            15
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
      >
      </Box>
    </CardContent>
  </Card>
);
