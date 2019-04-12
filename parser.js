'use strict';

const path = require('path');
const String = require('strings');
const fs = require('fs');
const moment = require('moment');

function render(dados) {
    let pathlayout;
    if (dados.layout == 0) {
        pathlayout = path.join(__dirname, 'layouts/default.epl');
    } else {
        pathlayout = path.join(__dirname, 'layouts/optional.epl');
    }
    let data = fs.readFileSync(pathlayout, 'utf8');
    
    data = data.replace('{lote}', dados.lote.substring(0, 10));
    data = data.replace('{data}', dados.data);
    data = data.replace('{code}', dados.code.substring(0, 10));
    data = data.replace('{desc}', dados.desc.substring(0, 15));
    data = data.replace('{cliente}', dados.cliente.substring(0, 10));
    data = data.replace('{ordem}', dados.ordem.substring(0, 10));
    data = data.replace('{qtdade}', dados.qtdade);
    data = data.replace('{unidade}', dados.unidade.substring(0, 6));
    return data;
}

module.exports.render = render;
