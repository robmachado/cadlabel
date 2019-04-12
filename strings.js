'use strict';
const encoding = require('encoding');

function squashString(str) {
    str = str.trim();
    var seek = ['á','à','ã','â','é','ê','í','ó','ô','õ','ú','ü',
    'ç','Á','À','Ã','Â','É','Ê','Í','Ó','Ô','Õ','Ú','Ü','Ç'];
    var subs = ['a','a','a','a','e','e','i','o','o','o','u','u',
    'c','A','A','A','A','E','E','I','O','O','O','U','U','C'];
    seek.forEach( (el, item) => {
        str = str.replace(seek[item], subs[item]);
    });
    str = str.replace(/[^\x20-\x7E]/g, '')
    str = str.replace(/(?:\s\s+)/g, ' ')
    return str;
}

function toASCII(str) {
    str = squashString(str);
    var resp = encoding.convert(str, 'ascii');
    return bin2string(resp);
}

function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}

module.exports.toASCII = toASCII;