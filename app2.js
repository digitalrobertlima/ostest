const clc = require("cli-color");
const yellow = clc.yellow;
const green = clc.green;
const blue = clc.blue;
const red = clc.red;
const white = clc.white;
const black = clc.black;

const urlTicker = "https://api.bitpreco.com/btc-brl/ticker";
const urlOrderbook = "https://api.bitpreco.com/btc-brl/orderbook";

function printPrice(lastPrice) {
        console.log("\nÚltimo preço negociado: " + yellow.bold(lastPrice));
}

function printVolume (volume) {
        console.log("\nVolume negociado em 24H: " + blue(volume) + "\n");
}

function contarWhileBid(objeto, i, whileAmount, amountWhile) {
        if (whileAmount >= amountWhile) {
                        let price = parseFloat(objeto.bids[i].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });                                                                           console.log("Compra sugerida: " + green.bold(price) + " " + whileAmount + " BTC");                                                          } else {
                }
}

function contarWhileAsk(objeto, i, whileAsk, amountWhile) {                                      if (whileAsk > amountWhile) {
        let price = parseFloat(objeto.asks[i].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        console.log('Venda sugerida: ' + red.bold(price) + " " + whileAsk + " BTC");
} else {}
}

function imprimeWhile(objeto) {

        let amountWhile = 0.1;

        for (let i = 0; i < 40; i++) {
                let whileAmount = objeto.bids[i].amount;
                contarWhileBid(objeto, i, whileAmount, amountWhile);
        }

        for (let i = 0; i < 40; i++) {
                let whileAsk = objeto.asks[i].amount;
                contarWhileAsk(objeto, i, whileAsk, amountWhile);
        }
}

function melhorPreco(objeto) {

        let buy = parseFloat(objeto.bids[0].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + " " + objeto.bids[0].amount + " BTC";                                      let sell = parseFloat(objeto.asks[0].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + " " + objeto.asks[0].amount.toFixed(8) + " BTC";
        let melhorComprador = "\nMelhor pagador: " + green.bold(buy);
        let melhorVendedor = "Melhor vendedor: " + yellow.bold(sell);

        console.log(melhorComprador + "\n" + melhorVendedor + "\n");
}

function imprimeOpostos(maior, menor) {

        console.log("Maior preço registrado em 24H: " + red(maior));;

        console.log("Menor preço registrado em 24H: " + green(menor));
}

function variacao24horas(variacao) {

        let message = "Variação em 24H: ";

        if (variacao > 0) {
                console.log(message + green.bold(variacao + "%"));
        } else if (variacao < 0) {
                console.log(message + red.bold(variacao + "%"));
        } else {
                console.log('error');
        }
}

function imprimeForca(objeto) {

        let somaCompras = 0;                          let somaVendas = 0;

        //console.log(objeto);

        for(let i = 0; i < 40; i++) {
                somaCompras = somaCompras + objeto.bids[i].amount;
                somaVendas = somaVendas + objeto.asks[i].amount;
        }

        console.log("Força de compra(40 pessoas): " + green(somaCompras.toFixed(8)) + " BTC's");
        console.log("Força de venda(40 pessoas): " + red(somaVendas.toFixed(8)) + " BTC's");
}

function imprimeBook(objeto) {

        imprimeForca(objeto);
        melhorPreco(objeto);
        imprimeWhile(objeto);
}

function imprimeTicker(objeto) {

        let lastPrice = parseFloat(objeto.last).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let volume = parseFloat(objeto.vol);
        let variacao = parseFloat(objeto.var);
        let market = objeto.market;
        let menor = parseFloat(objeto.low).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let maior = parseFloat(objeto.high).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let timestamp = objeto.timestamp;

        //console.log(objeto);

        console.log(yellow.bold("\nEste é um resumo do mercado atual: " + green(market) + "\n" + timestamp));

        printPrice(lastPrice);
        printVolume(volume);
        imprimeOpostos(maior, menor);
        variacao24horas(variacao);
}

function definirObjeto(objeto) {

        let tamanhoObjeto = Object.keys(objeto).length;

        if (tamanhoObjeto == 11) {

                console.log(blue.bold('\nAguardando ticker...'));

                imprimeTicker(objeto);

        } else if (tamanhoObjeto == 4) {

                console.log(blue.bold('\nAguardando orderbook...\n'));

                imprimeBook(objeto);

        } else {
                console.log('objeto nao reconhecido');
        }
}

function getJSON(url) {
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();

        request.open("GET", url, false);
        request.send();

        let obj = JSON.parse(request.responseText);
        definirObjeto(obj);

        return
}

function getPrice(ticker, orderbook) {

        getJSON(ticker);

        //console.log(obj);

        getJSON(orderbook);

        //console.log(obj);
}

function main() {
        console.log(yellow('\nCarregando...'));
        getPrice(urlTicker, urlOrderbook);
}

console.log(green('\nAbrindo API... Por favor aguarde!'));

main();

setInterval(main, 5000);
