const { app, BrowserWindow, Menu, Tray } = require('electron');
const printer = require('printer');
const util = require('util');
const url = require('url');
const path = require('path');

let mainWindow;

app.on('ready', function () {
    createWindow();
});

let listPrinters = printer.getPrinters();
let iconPath = path.join(__dirname, 'supermarket-barcode.png')
let printericon = path.join(__dirname, 'tray.png')
let submenu = [];
listPrinters.forEach((element) => {
    submenu.push({ label: element.name, icon: printericon });
});

let menutemp = [
    {
        label: 'Impressoras',
        submenu: submenu
    },
    {
        label: 'Sobre', click: function () {
            console.log('Aqui');
        }
    },
    {
        label: 'Sair', click: function () {
            app.isQuiting = true;
            app.quit();
        }
    }
];

function createWindow () {
    mainWindow = new BrowserWindow({ width: 800, height: 600,  title: 'CadLabel', icon: iconPath });

    let file = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(file);

    if (process.env.NODE_ENV == 'development') {
        mainWindow.webContents.openDevTools();
    }

    let contextMenu = Menu.buildFromTemplate(menutemp);

    let tray = new Tray(path.join(__dirname, 'supermarket-barcode.png'));
    tray.setContextMenu(contextMenu);

    tray.on('click', function() {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });

    mainWindow.on('show', function () {
        tray.setHighlightMode('always');
    });
}

