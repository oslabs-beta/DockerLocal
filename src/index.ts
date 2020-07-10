import { app, BrowserWindow, Menu } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

const express = require('./server/server.ts');
const path = require('path');
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// // use this to disable dark mode
// const { nativeTheme } = require('electron')
// console.log(nativeTheme.themeSource = 'light')
// console.log('menuItems!! ', Menu)
// const viewSettingsMenu = new Menu()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-line global-require
if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  // // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
  });
  mainWindow
    .loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    .then(() => mainWindow.webContents.openDevTools()); // uncomment to display dev tools
  mainWindow.focus();
};

app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((devtool: any) => console.log(`Added Extension:  ${devtool.name}`))
    .catch((err: any) => console.log('An error occurred: ', err));
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
