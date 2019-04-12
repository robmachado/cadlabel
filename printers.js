'use strict';

const printer = require('printer');
    
/**
 * Returns array with all printers names in desktop
 */
function list(callback)
{
    let list = [];
    var lp = printer.getPrinters();
    lp.forEach( (element) => {
        list.push(element.name);    
    });
    return list;
}

/**
 * Returns name of default printer
 */
function defaultPrinter()
{
    return printer.getDefaultPrinterName();
}

/**
 * Send label to printer
 * @param {*} data 
 * @param {*} name 
 */
function send(data, name)
{
    printer.printDirect({
        data: data,
        name: name,
        type: "RAW",
        success: (jobID) => {
            return "Sucesso";
        },
        error: (err) => {
            console.log(err);
        }
    });
}


module.exports.list = list;
module.exports.defaultPrinter = defaultPrinter;
module.exports.send = send;

