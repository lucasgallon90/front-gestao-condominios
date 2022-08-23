import { randomDate } from "../utils/index.js";
import { v4 as uuid } from "uuid";

export const caixa = [
  {
    _id: uuid(),
    descricao: "Pagamento Água",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    valor: 30.4,
    tipoMovimentacao: { descricao: "Conta à pagar", tipo: "S" },
  },
  {
    _id: uuid(),
    descricao: "Taxa Condomínio",
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    valor: 80.9,
    tipoMovimentacao: { descricao: "Cobrança", tipo: "E" },
  },
];
