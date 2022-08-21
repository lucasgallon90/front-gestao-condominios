import { v4 as uuid } from "uuid";

export const leituras = [
  {
    _id: uuid(),
    morador: { nome: "Joaquim" },
    leituraAtual: 105.4,
    leituraAnterior: 101.1,
    valor: 14,
    tipoLeitura: { descricao: "Água", taxaFixa: 34, valorUnidade: 0.6 },
    mesAno: "03/2022",
  },
  {
    _id: uuid(),
    morador: { nome: "Joaquim" },
    leituraAtual: 3.2,
    leituraAnterior: 1.1,
    valor: 20,
    tipoLeitura: { descricao: "Água", taxaFixa: 34, valorUnidade: 0.6 },
    mesAno: "03/2022",
  },
  {
    _id: uuid(),
    morador: { nome: "Luiz" },
    leituraAtual: 103.1,
    leituraAnterior: 99.1,
    valor: 12,
    tipoLeitura: { descricao: "Água", taxaFixa: 34, valorUnidade: 0.6 },
    mesAno: "03/2022",
  },
  {
    _id: uuid(),
    morador: { nome: "Joaquim" },
    leituraAtual: 4.1,
    leituraAnterior: 2.1,
    valor: 15,
    tipoLeitura: { descricao: "Gás", taxaFixa: 0, valorUnidade: 0.6 },
    mesAno: "03/2022",
  },
];
