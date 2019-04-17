import { app, BrowserWindow, Menu, dialog } from 'electron'

declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any
declare const MAIN_WINDOW_WEBPACK_ENTRY: any

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'

if (require('electron-squirrel-startup')) {
  app.quit()
}

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const createMenu = () => {
  const menuTemplate = [
    {
      label: 'GalaxyViewer',
      submenu: [
        {
          label: 'About GalaxyViewer',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              message: 'GalaxyViewer Version 0.0.1'
            })
          }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            dialog.showOpenDialog(
              {
                properties: ['openFile']
              },
              filePaths => {
                console.log(filePaths)
              }
            )
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

app.on('ready', () => {
  createWindow()
  createMenu()
})

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
