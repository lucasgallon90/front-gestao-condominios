import { randomDate } from "../utils/index.js";
import { v4 as uuid } from 'uuid';

export const moradores = [
  {
    _id: uuid(),
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: `morador${uuid()}@gestaodecondominios.com.br`,
    senha: 123,
    nome: "Joaquim B.",
    telefone: "(00) 92323-2500",
    apto: "104",
    bloco: "A",
    tipoUsuario: "morador",
    condominio: { nome: "Frei João Paulo II" },
    codigoCondominio: "novo"
  },
];
