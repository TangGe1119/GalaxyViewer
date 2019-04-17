import { app, BrowserWindow, ipcMain } from 'electron'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'

if (require('electron-squirrel-startup')) {
  app.quit()
}

let mainWindow

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('win-close', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})
