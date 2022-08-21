import { v4 as uuid } from "uuid";
import { randomDate } from "../utils/index.js";

export const usuarios = [
  {
    _id: uuid(),
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: "superadmin@gestaodecondominios.com.br",
    senha: 123,
    nome: "João L.",
    telefone: "(00) 99814-1500",
    apto: "204",
    bloco: "A",
    tipoUsuario: "morador",
    condominio: { nome: "São Pedro II" },
  },
  {
    _id: uuid(),
    createdAt: randomDate(new Date(2022, 0, 1), new Date()),
    email: "joaquimb@gestaodecondominios",
    nome: "Joaquim B.",
    telefone: "(00) 92323-2500",
    apto: "104",
    bloco: "A",
    tipoUsuario: "morador",
    condominio: { nome: "Frei João Paulo II" },
  },
];
