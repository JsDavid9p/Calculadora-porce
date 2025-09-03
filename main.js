const { app, BrowserWindow } = require('electron');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 900,
    frame: false, // Esto hace la ventana sin marco
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.setMenu(null); // Esto elimina el menú
  remoteMain.enable(win.webContents); // Habilita @electron/remote
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