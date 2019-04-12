'use strict';

const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
process.env.NODE_ENV = "dev";

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        minWidth: 800,
        minHeight: 500,
        icon: path.join(__dirname, 'icon.png')
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.setMenu(null);

    if (process.env.NODE_ENV != "production") {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => app.quit());
});
