export function formatarMoeda(value) {
  if (!isNaN(value)) {
    let f = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    return f;
  }
  return null;
}

export function formatarDecimal(n) {
  return n.toFixed(2).toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });
}

export function formatarCEP(str) {
  var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;
  if (re.test(str)) {
    return str.replace(re, "$1$2-$3");
  } else {
    return str;
  }
}

/*
UTILIZADO PARA O MÓDULO A NA GERAÇÃO DOS MOCKS
*/
export function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
