'use strict';

const form = document.querySelector('form');
const settings = require('electron-settings');
const moment = require('moment');
const strings = require('./strings');
const parser = require('./parser');
const printers = require('./printers');



/* constuct dos inputs */
const inputs = {
    layout: form.querySelector('select[name="sellayout"]'),
    impressora: form.querySelector('select[name="selprinter"]'),
    data: form.querySelector('input[name=data]'),
    lote: form.querySelector('input[name=lote]'),
    code: form.querySelector('input[name=code]'),
    desc: form.querySelector('input[name=desc]'),
    cliente: form.querySelector('input[name=cliente]'),
    ordem: form.querySelector('input[name=ordem]'),
    qtdade: form.querySelector('input[name=qtdade]'),
    unidade: form.querySelector('input[name=unidade]')
};

// seta opções basicas e a data atual
inputs.data.value = moment().format('YYYY-MM-DD');
let defaultPrinter = printers.defaultPrinter();
if (!settings.has('printer.name')) {
    settings.set('printer', {
        name: defaultPrinter
    });
} else {
    defaultPrinter = settings.get('printer.name');
}
printers.list().forEach( (element) => {
    var option = document.createElement("option");
    option.text = element;
    option.value = element;
    option.selected = (element == defaultPrinter) ? true : false;
    inputs.impressora.appendChild(option)
});
// grava a opção de impressora
inputs.impressora.addEventListener('change', (event) => {
    settings.set('printer', {
        name: event.target.value
    });
});

// ao clicar em submeter processar os dados e passar para a impressora
form.addEventListener('submit', (event) => {
    event.preventDefault();
    var dados = new Object();
    dados.layout = inputs.layout.value;
    dados.printer = inputs.impressora.value;
    dados.data = inputs.data.value;
    dados.lote = strings.toASCII(inputs.lote.value);
    dados.code = strings.toASCII(inputs.code.value);
    dados.desc = strings.toASCII(inputs.desc.value);
    dados.cliente = strings.toASCII(inputs.cliente.value);
    dados.ordem = strings.toASCII(inputs.ordem.value);
    dados.qtdade = inputs.qtdade.value;
    dados.unidade = strings.toASCII(inputs.unidade.value);
    let data = parser.render(dados);
    console.log(dados);
    printers.send(data, dados.printer);
});
