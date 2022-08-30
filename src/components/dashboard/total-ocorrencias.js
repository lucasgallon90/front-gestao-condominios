import { Avatar, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useEffect, useState } from "react";
import api from "../../services/api";

export const TotalOcorrencias = (props) => {
  const [loading, setLoading] = useState(true);
  const [totalOcorrencias, setTotalOcorrencias] = useState(0);

  useEffect(async () => {
    await api
      .get("ocorrencias/count/total")
      .then((res) => {
        res.data && setTotalOcorrencias(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              OCORRÊNCIAS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {loading ? <CircularProgress size={25} /> : totalOcorrencias}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <ArticleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
