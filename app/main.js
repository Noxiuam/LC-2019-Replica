const { app, BrowserWindow, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1144,
    height: 644,
    frame: false,
    transparent: true,
    fullscreenable: false,
    icon: "./logo.png",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = "info";
  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: "info",
      buttons: ["Update"],
      title: "Lunar Client",
      message: "Launcher update available",
      detail: "Press update to install version " + info.version
    }, (button, checkbox) => {
      autoUpdater.quitAndInstall(false, true);
    });
  });

  mainWindow.loadFile('app/index.html');
  // mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => { 
    mainWindow.webContents.session.clearCache(function(){
        console.error('Cache Cleared')
    });
});

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow();
})

app.on('second-instance', (e, c, w) => {
  app.quit();
});

app.on('window-all-closed', function () {
  app.quit()
})
