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

export function formatarTelefone(v = "") {

  let r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 11) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 7) {
    r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else if (v.trim() !== "") {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}

/*
UTILIZADO PARA O MÓDULO A NA GERAÇÃO DOS MOCKS
*/
export function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function getRandomEmail(domain,length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + domain;
}
