const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 900,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Manejadores para acciones de ventana
  ipcMain.on('minimize-app', () => {
    win.minimize();
  });

  ipcMain.on('maximize-app', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('close-app', () => {
    win.close();
  });

  win.loadFile('index.html');
  win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
