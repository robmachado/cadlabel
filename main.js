'use strict';

const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
process.env.NODE_ENV = "production";


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 570,
        minWidth: 800,
        minHeight: 570,
        titleBarStyle: 'hidden',
        title: 'cadlabel',
        skipTaskbar: true,
        toolbar: false,
        icon: path.join(__dirname, 'icon.png')
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.setMenu(null);
    mainWindow.setMenuBarVisibility(false);

    if (process.env.NODE_ENV != "production") {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => app.quit());
});
