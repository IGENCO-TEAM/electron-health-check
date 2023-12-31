import path from "path";
import { app, protocol, BrowserWindow, ipcMain, Tray, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

const db = require("./core/lib/sqlite3");
const osu = require("node-os-utils");

const { IncomingWebhook } = require("@slack/webhook");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

const sendSlack = async (url, message) => {
  const webhook = new IncomingWebhook(url);
  await webhook.send(message);
};

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "src/assets/icons/favicon.ico",
    // skipTaskbar: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  });

  /**
   * Hide menu bar
   */
  win.setMenuBarVisibility(false);

  /**
   * Allow openExternal link
   */
  win.webContents.setWindowOpenHandler(({ url }) => {
    require("electron").shell.openExternal(url);
    return { action: "deny" };
  });

  // eslint-disable-next-line no-unused-vars
  win.on("close", function(event) {
    event.preventDefault();
    win.hide();
  });

  win.on("minimize", event => {
    event.preventDefault();
    win.hide();
  });

  /**
   * Create tray
   */
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        win.show();
      }
    },
    {
      label: "Quit",
      click: () => {
        /**
         * Quit app
         */
        win.destroy();
        app.quit();
      }
    }
  ]);
  const trayIcon = process.env.WEBPACK_DEV_SERVER_URL
    ? path.join(__dirname, `../public/img/Tray.ico`)
    : path.join(__dirname, `../app.asar/img/Tray.ico`);
  const tray = new Tray(trayIcon);
  tray.setToolTip("App Health Check");
  tray.setContextMenu(contextMenu);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// eslint-disable-next-line no-unused-vars
ipcMain.on("ping:cpu", (event, data) => {
  // get cpu usage percentage
  osu.cpu.usage().then(cpuPercentage => {
    event.sender.send("pong:cpu", {
      cpuPercentage
    });
  });
});

// eslint-disable-next-line no-unused-vars
ipcMain.on("ping:mem", (event, data) => {
  osu.mem.info().then(memInfo => {
    event.sender.send("pong:mem", {
      memInfo
    });
  });
});

// eslint-disable-next-line no-unused-vars
ipcMain.on("ping:disk", (event, data) => {
  console.log(`get drive info`);
});

// eslint-disable-next-line no-unused-vars
ipcMain.on("get:setting", (event, data) => {
  const sql = "SELECT * FROM setting";
  // get all
  db.all(sql, (error, rows) => {
    if (error) {
      throw new Error(error.message);
    }
    event.sender.send("rs:setting", rows);
  });
});

// eslint-disable-next-line no-unused-vars
ipcMain.on("update:setting", (event, data) => {
  const sql = `UPDATE setting SET value = '${data.value}' WHERE id = '${data.id}'`;
  // update
  db.run(sql, error => {
    if (error) {
      throw new Error(error.message);
    }

    // get all
    const sql = "SELECT * FROM setting";
    db.all(sql, (error, rows) => {
      if (error) {
        throw new Error(error.message);
      }
      event.sender.send("rs:update:setting", rows);
    });
  });
});

// eslint-disable-next-line no-unused-vars
ipcMain.on("test:send:slack", (event, data) => {
  /**
   * get [SLACK_NAME_HOOK]
   */
  const sql = "SELECT * FROM setting WHERE name = 'SLACK_NAME_HOOK';";
  db.get(sql, (error, row) => {
    if (error) {
      throw new Error(error.message);
    }
    const SLACK_NAME_HOOK = row.value;

    /**
     * get [SLACK_URL_HOOK]
     */
    const sqt = "SELECT * FROM setting WHERE name = 'SLACK_URL_HOOK';";
    db.get(sqt, (err, d) => {
      if (err) {
        throw new Error(err.message);
      }

      const SLACK_URL_HOOK = d.value;

      let bodyBlock = {};
      bodyBlock.blocks = [];

      /**
       * Header Slack
       */
      let header = {
        type: "header",
        text: {
          type: "plain_text",
          text: `✅${SLACK_NAME_HOOK}✅`,
          emoji: true
        }
      };
      bodyBlock.blocks.push(header);

      /**
       * CPU Slack
       */
      let cpuMessage = "CPU works normally💚💚";
      if (parseFloat(data.cpuPercentage) > 80) {
        cpuMessage = "*Message:*\nCPU running more than 80% 🔥🔥";
      }
      let cpu = {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*CPU Usage:*\n${data.cpuPercentage}%`
          },
          {
            type: "mrkdwn",
            text: cpuMessage
          }
        ]
      };
      bodyBlock.blocks.push(cpu);

      /**
       * Memory Slack
       */
      let memMessage = "Memory works normally💚💚";
      if (parseFloat(data.memPercentage) > 80) {
        memMessage = "*Message:*\nMemory running more than 80% 🔥🔥";
      }
      let mem = {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Memory Usage:*\n${data.memPercentage}%`
          },
          {
            type: "mrkdwn",
            text: memMessage
          }
        ]
      };
      bodyBlock.blocks.push(mem);

      /**
       * Send message to slack
       */
      sendSlack(SLACK_URL_HOOK, bodyBlock).then(() => {
        event.sender.send("rs:test:send:slack", "success");
      });
    });
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  /**
   * Create window
   */
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
