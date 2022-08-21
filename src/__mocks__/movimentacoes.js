import { randomDate } from "src/utils";
import { v4 as uuid } from "uuid";

export const movimentacoes = [
  {
    _id: uuid(),
    descricao: "Conta Luz Março/2022",
    valor: 50,
    dataPagamento: new Date(),
    dataVencimento: new Date(),
    tipoMovimentacao: { descricao: "Conta à pagar", tipo: "S" },
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    ratear: true,
  },
  {
    _id: uuid(),
    descricao: "Juros bancário Março/2022",
    valor: 150,
    dataPagamento: new Date(),
    dataVencimento: new Date(),
    tipoMovimentacao: { descricao: "Ajuste de Caixa", tipo: "E" },
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    ratear: true,
  },
];
