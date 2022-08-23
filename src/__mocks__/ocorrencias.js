import { randomDate } from "../utils/index.js";
import { v4 as uuid } from "uuid";

export const ocorrencias = [
  {
    _id: uuid(),
    motivo: "Problema na luz do andar 1",
    descricao: "Luz deve estar queimada",
    situacao: "Resolvida",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    morador: {nome:"Joaquim"},
  },
  {
    _id: uuid(),
    motivo: "Problema no reigstro da água",
    descricao: "Favor verificar o registro",
    situacao: "Aberta",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    morador: {nome:"Joaquim"},
  },
];
