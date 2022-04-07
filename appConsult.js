let clc = require("cli-color");
const fs = require("fs");
let data = clc.blue('Aguardando status de mercado...');
                                              /*
function writeData(data) {

        console.log(data)
        fs.writeFile('arquivo.txt', data, (err) => {
                if (err) throw err;                           console.log('O arquivo foi criado!');                                               });
}
*/

function trabalharDadosTicker(objeto) {

        //console.log(objeto);

        let market = objeto.market;
        let ultimoPreco = parseFloat(objeto.last);
        let maiorPreco = parseFloat(objeto.high);
        let menorPreco = parseFloat(objeto.low);
        let volumeNegociado = parseFloat(objeto.vol);
        let timestamp = objeto.timestamp;

        console.log(clc.black.bgWhite('\nTrabalhando dados Ticker Bit Preço:') + "\n");
        console.log('Você está acompanhando o mercado ' + market + ' em tempo real!\n\n' + clc.yellow(timestamp));
        console.log('\nÚltimo preço registrado: R$' + clc.yellow.bold(ultimoPreco));
        console.log('Volume nas últimas 24 horas: ' + clc.blue(volumeNegociado));
        console.log('\nMaior preço em 24H: R$' + clc.red(maiorPreco));
        console.log('Menor preço em 24H: R$' + clc.green(menorPreco));
}

function trabalharDadosOrderbook(objeto) {

        //console.log(objeto);

        let somaCompras = 0;
        let somaVendas = 0;
        let melhorComprador = objeto.asks[0].price;
        let melhorVendedor = objeto.asks[0].price;
        let amountPrimeiroBid = objeto.bids[0].amount;
        let amountPrimeiroAsk = objeto.asks[0].amount;
        let timestamp = objeto.timestamp;

        for (let i = 0; i < 40; i++) {
                somaCompras = somaCompras + objeto.bids[i].amount;
                somaVendas = somaVendas + objeto.asks[i].amount;
        }

        console.log("\nForça de compra: " + clc.green(somaCompras) + " BTCs");
        console.log("Força de venda: " + clc.red(somaVendas) + " BTCs");

        if (somaVendas > somaCompras) {
                console.log(clc.red('Força de Venda maior!\n\nVENDER!\n' + timestamp));
        } else if (somaCompras > somaVendas) {
                console.log(clc.green('Força de Compra maior!\n\nCOMPRAR!\n'));
                data = clc.green('COMPRAR ' + timestamp);
                //writeData(data);
        } else {
                console.log('error');
        }
}

function getMarket(url) {

        let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        let request = new XMLHttpRequest();

        request.open('GET', url, false);
        request.send();

        let obj = JSON.parse(request.responseText);
        let tamanho = Object.keys(obj).length;

        if (tamanho == 11) {
                trabalharDadosTicker(obj);
        } else if (tamanho == 4) {
                trabalharDadosOrderbook(obj);
        } else {
                console.log('Url não reconhecida');
        }
}

function main() {

        getMarket("https://api.bitpreco.com/btc-brl/ticker");
        getMarket("https://api.bitpreco.com/btc-brl/orderbook");

}

main();

setInterval(main, 10000);
