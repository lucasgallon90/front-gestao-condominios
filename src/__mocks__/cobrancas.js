import { randomDate } from "../utils/index.js";
import { v4 as uuid } from "uuid";

export const cobrancas = [
  {
    _id: uuid(),
    descricao: "Condominio Março/2022 Apto 402",
    valor: 50,
    mesAno: "03/2022",
    dataPagamento: new Date(),
    dataVencimento: new Date(),
    createdAt: new Date(),
  },{
    _id: uuid(),
    descricao: "Condominio Novembro/2022 Apto 401",
    valor: 80,
    mesAno: "11/2022",
    dataPagamento: new Date(),
    dataVencimento: new Date(),
    createdAt: new Date(),
  },
];
