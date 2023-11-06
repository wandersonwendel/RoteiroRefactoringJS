const { readFileSync } = require('fs');

class ServicoCalculoFatura {
  constructor(repo) {
    this.repo = repo;
 }

  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia") 
       creditos += Math.floor(apre.audiencia / 5);
    return creditos;   
  }

  calcularTotalCreditos(apresentacoes) {
    let totalCreditos = 0;
    for (let apre of apresentacoes){
      totalCreditos += this.calcularCredito(apre);
    }
    return totalCreditos;
  }

  calcularTotalApresentacao(apre) {
    let total = 0;
      
    switch (this.repo.getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecia: ${this.repo.getPeca(apre).tipo}`);
    }
    return total;
  }

  calcularTotalFatura(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes){
      total += this.calcularTotalApresentacao(apre);
    }
    return total;
  }
}

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync('./pecas.json'));
  }

  getPeca(apre) {
    return this.pecas[apre.id];
  }
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}

function gerarFaturaStr(fatura) {

  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
    return faturaStr;
}

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
/* const faturaHTML = gerarFaturaHTML(faturas, pecas);
 */

/* // Exemplo de como salvar o HTML em um arquivo (Node.js)
const { writeFileSync } = require('fs');
writeFileSync('./fatura.html', faturaHTML); */
