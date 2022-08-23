import { randomDate } from "../utils/index.js";
import { v4 as uuid } from "uuid";

export const tiposLeitura = [
  {
    _id: uuid(),
    descricao: "Água",
    unidadeMedida: "m3",
    taxaFixa: 30.14,
    valorUnidade:0.65,
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  },
  {
    _id: uuid(),
    descricao: "Gás",
    unidadeMedida: "m3",
    taxaFixa: 0,
    valorUnidade:1.20,
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
  },
];
