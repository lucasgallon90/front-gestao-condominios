import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";

export const TotalCondominios = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Condomínios
          </Typography>
          <Typography color="textPrimary" variant="h5">
            4
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
      >
      </Box>
    </CardContent>
  </Card>
);
