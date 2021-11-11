const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const createNewWindow = () => {
  const window = new BrowserWindow({
    width: 700,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  return window;
};

app.whenReady().then(() => {
  const window = createNewWindow();
  window.loadFile("./index.html");
  const menuTemplate = [
    {
      label: "New File",
      click() {
        window.webContents.send("new:file");
      },
    },
    {
      label: "New Folder",
      click() {
        window.webContents.send("new:folder");
      },
    },
    {
      label: "Quit",
      click() {
        app.quit();
      },
    },
  ];
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  window.webContents.on("context-menu", (e, params) => {
    mainMenu.popup(window, params.x, params.y);
  });
});
app.on("window-all-closed", () => {
  app.quit();
});
