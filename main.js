const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain, Menu } = require("electron");

const connectDB = require("./config/db");
const Log = require("./models/Log");

// Connect to the database
connectDB();

let mainWindow;

let isDev = false;
const isMac = process.platform === "darwin" ? true : false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1400 : 1100,
    height: 800,
    show: false,
    backgroundColor: "white",
    icon: "./assets/icons/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  { role: "fileMenu" },
  { role: "editMenu" },
  {
    label: "Logs",
    submenu: [
      {
        label: "Clear Logs",
        click: () => clearLogs(),
      },
    ],
  },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];

// Load logs
ipcMain.on("logs:load", sendLogs);

// Create log
ipcMain.on("logs:add", async (e, item) => {
  try {
    await Log.create(item);
    sendLogs();
  } catch (e) {
    console.error(e);
  }
});

// Delete log
ipcMain.on("logs:delete", async (e, _id) => {
  try {
    await Log.findOneAndDelete({ _id: _id });
    sendLogs();
  } catch (e) {
    console.error(e);
  }
});

async function sendLogs() {
  try {
    const logs = await Log.find().sort({ created: 1 });
    mainWindow.webContents.send("logs:get", JSON.stringify(logs));
  } catch (e) {
    console.error(e);
  }
}

async function clearLogs() {
  try {
    await Log.deleteMany({});
    mainWindow.webContents.send("logs:clear");
  } catch (e) {
    console.error(e);
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
