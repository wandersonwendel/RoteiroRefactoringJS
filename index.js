const { readFileSync } = require('fs');

var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js") ;
var gerarFaturaStr = require("./apresentacao.js");



/* function gerarFaturaHTML(fatura, pecas) {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fatura - ${fatura.cliente}</title>
      <style>
        
      </style>
    </head>
    <body>
      <h1>Fatura ${fatura.cliente}</h1>
      <ul>
  `;

  for (let apre of fatura.apresentacoes) {
    const peca = getPeca(pecas, apre);
    const totalApresentacao = calc.calcularTotalApresentacao(pecas, apre);
    html += `
        <li>
          <strong>${peca.nome}:</strong>
          ${formatarMoeda(totalApresentacao)} (${apre.audiencia} assentos)
        </li>
    `;
  }

  const totalFatura = calc.calcularTotalFatura(pecas, fatura.apresentacoes);
  const totalCreditos = calc.calcularTotalCreditos(pecas, fatura.apresentacoes);

  html += `
      </ul>
      <p><strong>Valor total:</strong> ${formatarMoeda(totalFatura)}</p>
      <p><strong>Créditos acumulados:</strong> ${totalCreditos}</p>
    </body>
    </html>
  `;

  return html;
  
}
*/

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);
/* const faturaHTML = gerarFaturaHTML(faturas, pecas);*/
/*const { writeFileSync } = require('fs');
writeFileSync('./fatura.html', faturaHTML); */
