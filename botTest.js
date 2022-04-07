//teste bot cripto

var clc = require("cli-color");

function infoPreco(objetoJs) {

        let menorPreco = objetoJs.low;
        let maiorPreco = objetoJs.high;
        let ultimoPreco = objetoJs.last;
        let variacao24H = objetoJs.var;
        let volumeNegociado = objetoJs.vol;

        //for debug:

        if (variacao24H < 0) {
                variacao24H = clc.red(variacao24H);
        } else if (variacao24H > 0) {
                variacao24H = clc.green(variacao24H);
        } else {
                console.log('mercado neutro')
        }

        let astr10 = "\n**********\n"
        let debug = "\nInformações da BitPreço:\n\nMenor Preço em 24H: R$" + menorPreco + "\nMaior Preço em 24H: R$" + maiorPreco + "\n\nÚltimo preço registrado: " + clc.yellow("R$" + ultimoPreco) + "\n\nVariação em 24H: " + variacao24H + " %" + "\nVolume Negociado em 24H: " + volumeNegociado;
        console.log(astr10 + "INIT" + astr10 + debug + "\n" + astr10 + "END" + astr10); //for debug;
}

function infoBook(objetoJs) {

        let somaCompras = 0;
        let somaVendas = 0;
        let melhorComprador = 0;
        let melhorVendedor = 0;

        for (let i = 0; i < 40; i++) {
                somaCompras = somaCompras + objetoJs.bids[i].amount;
                somaVendas = somaVendas + objetoJs.asks[i].amount;
        }

        somaCompras = clc.green(somaCompras);
        somaVendas = clc.red(somaVendas);

        console.log("\nCompra bruta: " + somaCompras + " BTC");
        console.log("\nVenda bruta: " + somaVendas + " BTC");
        console.log("\n********************");
        console.log("\nMelhor comprador: R$" + objetoJs.bids[0].price);
        console.log("\nMelhor vendedor: R$" + objetoJs.asks[0].price);
}

function xhrOpenBook(url) {

        let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, false);
        xhr.send();

        let json = xhr.responseText;
        let obj = JSON.parse(json);

        infoBook(obj);

        /*
        somaCompra(obj);
        somaVenda(obj);
        melhorPreco(obj);
        melhorVenda(obj);
        */

        //console.log(obj);
}

function xhrOpenTicker(url) {

        let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();

        let json = xhr.responseText;                  let obj = JSON.parse(json);

        /*
        maiorPreco24H(obj);
        menorPreco24H(obj);
        variacao24H(obj);
        volumeNegociado(obj);
        */

        infoPreco(obj)

        //console.log(obj);
}

function getBinance() {

        //console.log('esperando resposta Binance');
}

function getBitPreco() {
        let urlTicker = "https://api.bitpreco.com/btc-brl/ticker";
        let urlBook = "https://api.bitpreco.com/btc-brl/orderbook";

        xhrOpenBook(urlBook);
        xhrOpenTicker(urlTicker);

        //console.log('esperando API Bit Preço');
}

function getFoxBit() {

        //console.log('esperando resposta da API');
}

function getPrice() {

        console.log(clc.blue("\nSolicitando API's"));

        getBinance();
        getBitPreco();
        getFoxBit();

        //console.log("Rodando API's");
}

function main() {

        getPrice();

        //for debug:
        console.log('\nDebugging completo');
}

main();
