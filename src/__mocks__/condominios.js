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
    codigoCondominio: "joaopaulo2",
    ativo:true
  },
];
