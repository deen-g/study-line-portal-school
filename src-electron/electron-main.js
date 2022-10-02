import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { initialize, enable } from '@electron/remote/main' // <-- add this
initialize() // <-- add this
import path from 'path'
import os from 'os'
// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */


  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    frame: false, // <-- add this
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
  enable(mainWindow.webContents) // <-- add this
  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      // mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
ipcMain.handle('winAPI:load-close', () => {
  mainWindow.close()
})
ipcMain.handle('winAPI:load-minimize', () => {
  mainWindow.minimize()
})
ipcMain.handle('winAPI:load-maximize', () => {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize()
    }
})
ipcMain.handle('winAPI:load-fullscreen', () => {
      if (mainWindow.isSimpleFullScreen()) {
        mainWindow.setSimpleFullScreen(false)
    } else {
        mainWindow.setSimpleFullScreen(true)
    }
})
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
