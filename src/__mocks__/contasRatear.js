import { randomDate } from "../utils/index.js";
import { v4 as uuid } from "uuid";

export const contasRatear = [
  {
    _id: uuid(),
    descricao: "Conta Luz Março/2022",
    valor: 50,
    dataPagamento: new Date(),
    dataVencimento: new Date(),
    tipoMovimentacao: { descricao: "Cobrança", tipo: "S" },
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    ratear: true,
  },
];
