import { v4 as uuid } from "uuid";
import { randomDate } from "../utils/index.js";

export const tiposMovimentacao = [
  {
    _id: uuid(),
    descricao: "Conta à receber",
    tipo: "E",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    _id: uuid(),
    descricao: "Conta à pagar",
    tipo: "S",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    _id: uuid(),
    descricao: "Ajuste Entrada",
    tipo: "E",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    _id: uuid(),
    descricao: "Ajuste Saída",
    tipo: "S",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  },
];
