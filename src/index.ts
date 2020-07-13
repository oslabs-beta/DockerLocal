import { app, BrowserWindow, shell, session, WebPreferences } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { EXPRESS_URL } from "./client/helpers/constants";



const express = require('./server/server.ts');
const path = require('path');

// global variable pointing to main_window under entrypoints in package.json
// loads index.html and app.tsx
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// // use this to disable dark mode
// const { nativeTheme } = require('electron')
// console.log(nativeTheme.themeSource = 'light')
// console.log('menuItems!! ', Menu)
// const viewSettingsMenu = new Menu()


// let mainWindow: BrowserWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-line global-require
if (require('electron-squirrel-startup')) app.quit();

const createWindow = (): void => {
  // // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false

    }
    
  
  });

  // set permission requests to false for all remote content - electron security checklist
  
  
  mainWindow
  .loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  .then(() => mainWindow.webContents.openDevTools()); // uncomment to display dev tools
  mainWindow.focus();
};



app.whenReady().then(() => {
  // automatically deny all permission requests from remote content 
  session.defaultSession.setPermissionRequestHandler((webcontents, permission, callback) => callback(false));
//   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//   callback({
//     responseHeaders: {
//       ...details.responseHeaders,
//       'Content-Security-Policy': ['default-src \'self\'']
//     }
//   })
// })


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


// Verify WebView Options Before Creation - from electron security docs - https://www.electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences: WebPreferences & { preloadURL: string}, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;
    delete webPreferences.preloadURL;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;

    // No URLS should be loaded
    event.preventDefault();
    
  })
})

const URL = require('url').URL

// only allows navigation to our express server URL
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    if (parsedUrl.origin !== EXPRESS_URL) {
      event.preventDefault()
    }
  })
})

// doesnt allow new windows to be created
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    event.preventDefault()
    await shell.openExternal(navigationUrl)
  })
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
