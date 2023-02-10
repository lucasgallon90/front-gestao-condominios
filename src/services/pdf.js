import moment from "moment";
import { formatarMoeda } from "../utils";

export function imprimirCobranca(values) {
  return {
    title: "Cobrança",
    header: [
      { label: "Nome", value: values.morador.nome },
      {
        label: `Apto${values.morador.bloco ? "/Bloco" : ""}`,
        value: values.morador.bloco
          ? `${values.morador.apto}/${values.morador.bloco}`
          : values.morador.apto,
      },
      {
        label: "Descrição",
        value: values.descricao,
      },
      {
        label: "Data Vencimento",
        value: values.dataVencimento ? moment(values.dataVencimento).format("DD/MM/YY") : "-",
      },
      {
        label: "Data Pagamento",
        value: values.dataPagamento ? moment(values.dataPagamento).format("DD/MM/YY") : "-",
      },
      {
        label: "Mês/Ano",
        value: moment(values.mesAno + "-01").format("MM/YYYY"),
      },
    ],
    columnHead: [
      {
        label: "Conta/Leitura",
        key: "_idMovimentacao",
        format: (value) => (value ? "Conta" : "Leitura"),
      },
      { label: "Descrição", key: "descricao" },
      { label: "Leitura", groupKey: ["leitura", "unidadeMedida"], key: "leitura" },
      {
        label: "Valor Conta Rateada / Leitura",
        key: "valor",
        format: (value) => formatarMoeda(value),
      },
    ],
    data: values.itemsCobranca,
    total: formatarMoeda(values.valor),
  };
}
