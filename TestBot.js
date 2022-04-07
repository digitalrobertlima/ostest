//testing an app

const clc = require("cli-color");
const yellow = clc.yellow;
const blue = clc.blue;
const green = clc.green;
const red = clc.red;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const req = new XMLHttpRequest();
const ticker = "https://api.bitpreco.com/btc-brl/ticker";
const orderbookBit = "https://api.bitpreco.com/btc-brl/orderbook";
const stars = "\n********************\n";

function trabalharTicker(objeto) {

        let ultimoPreco = parseFloat(objeto.last);
        let variacao24h = parseFloat(objeto.var);
        let melhorVenda = parseFloat(objeto.buy);
        let melhorCompra = parseFloat(objeto.sell);
        let lastPrice = stars + "Útimo preço registrado: " + yellow.bold("R$" + ultimoPreco);
        let volume = parseFloat(objeto.vol);
        let message = "Volume negociado: " + blue(volume) + "\nMelhor preço de compra: " + green("R$" + melhorCompra) + "\nMelhor preço de venda: " + red(melhorVenda);

        function imprime(number) {
                console.log(message);
                console.log("\nVariação em 24 horas: " + number);
                console.log(lastPrice);

        }

        function colorVariacao(variacao24h) {
                if (variacao24h > 0) {
                        let variacao = green(variacao24h + "%");
                        imprime(variacao);
                } else {
                        let variacao = red(variacao24h + "%");
                        imprime(variacao);
                }
        }

        colorVariacao(variacao24h);
}

function trabalharOrderbook(book) {
        let tamanho = Object.keys(book.asks).length;
        console.log(tamanho);
}

function trabalharDados(dados) {

        let tamanhoObjeto = Object.keys(dados).length;
        if (tamanhoObjeto == 11) {
                trabalharTicker(dados);
        } else if (tamanhoObjeto == 4) {
                trabalharOrderbook(dados);
        } else {
                console.log("Tamanho do objeto: " + tamanhoObjeto);
        }

}

function getJSON(url) {
        req.open("GET", url, false);
        req.send();

        let obj = JSON.parse(req.responseText);
        trabalharDados(obj);
        return
}

function getPrice() {

        getJSON(ticker);
        getJSON(orderbookBit);
}

function constructUI(dados) {

        const quebraDeLinha = "\n";
        const welcome = "Bem-vind@ usuári@...\n\nO programa a seguir faz uma requisição na API da Bit Preço e retorna a soma dos asks e bids dos 40 primeiros no livro, indicando a força de cada lado usando como referência a quantidade de BTC's a serem negociados...";

        console.log(yellow(stars));
        console.log(blue(welcome + quebraDeLinha));
}

function main() {
        constructUI();
        getPrice();
}

main();
