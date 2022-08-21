import { randomDate } from "src/utils";
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
    itemsCobranca:[
      {
        id: uuid(),
        descricao: "Conta Luz Março/2022",
        valorTotal: 50,
        valorRateado: 5,
        leitura:0,
        dataPagamento: new Date(),
        dataVencimento: new Date(),
        tipoMovimentacao: { descricao: "Conta à pagar", tipo: "S" },
        createdAt: randomDate(new Date(2022, 0, 1), new Date()),
      },
    ]
  },
];
