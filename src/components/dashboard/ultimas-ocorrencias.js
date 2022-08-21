import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import Router from "next/router";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import api from "src/services/api";
import { Chip } from "../chip";

export const UltimasOcorrencias = (props) => {
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(async () => {
    await api
      .post("ocorrencias/list", null, { params: { limit: 1 } })
      .then((res) => {
        res.data && setOcorrencias(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
              {ocorrencias?.map((ocorrencia) => (
                <TableRow hover key={ocorrencia._id}>
                  <TableCell>{format(new Date(ocorrencia.createdAt), "dd/MM/yyyy - HH:mm")}</TableCell>
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
