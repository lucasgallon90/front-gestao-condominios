import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardHeader,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import api from "../../services/api";
import { formatarData } from "../../utils";
import { Chip } from "../chip";

export const UltimasOcorrencias = (props) => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    await api
      .post("ocorrencias/list", null, { params: { limit: 1 } })
      .then((res) => {
        setOcorrencias(res.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>setLoading(false))
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Últimas Ocorrências" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Morador</TableCell>
                <TableCell>Situação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {ocorrencias?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={1000} sx={{ textAlign: "center" }}>
                      <Box>
                        {loading ? (
                          <>
                            Carregando...
                            <LinearProgress />
                          </>
                        ) : (
                          "Nenhum registro encontrado"
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              {ocorrencias?.map((ocorrencia) => (
                <TableRow hover key={ocorrencia._id}>
                  <TableCell>{formatarData(ocorrencia.createdAt)}</TableCell>
                  <TableCell>{ocorrencia.motivo}</TableCell>
                  <TableCell>{ocorrencia.usuarioOcorrencia?.nome}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        (ocorrencia.situacao === "Resolvida" && "success") ||
                        (ocorrencia.situacao === "Em progresso" && "warning") ||
                        "error"
                      }
                    >
                      {ocorrencia.situacao}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={() => Router.push("/ocorrencias")}
          size="small"
          variant="text"
        >
          Ver todas
        </Button>
      </Box>
    </Card>
  );
};
