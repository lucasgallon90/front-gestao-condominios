import { v4 as uuid } from "uuid";

export const condominios = [
  {
    _id: uuid(),
    nome: "Edifício João Paulo II",
    endereco: "Rua Joaquim Barbosa, 120, Centro",
    cidade: "Porto Alegre",
    uf: "RS",
    cep: "91000000",
    saldoCaixaInicial: 1540,
    saldoCaixaAtual: 1800,
    codigoCondominio: "condominio1",
    ativo:true
  },
  {
    _id: uuid(),
    nome: "Edifício João Paulo",
    endereco: "Rua Joaquim Barbosa, 115, Centro",
    cidade: "Porto Alegre",
    uf: "RS",
    cep: "91000000",
    saldoCaixaInicial: 0,
    saldoCaixaAtual: 0,
    codigoCondominio: uuid(),
    ativo:true
  },
];
