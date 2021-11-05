const { google } = require("googleapis");
const path = require("path");

pathToKey = path.join(__dirname, "../creds.json");
DATA_DIR = path.join(__dirname, "../data");
const clolor = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

const MAIN_FOLDER = "1jemzLe1MTMD5PU7IrErTw3JvPQl6ILST";

const auth = new google.auth.GoogleAuth({
  keyFile: `${pathToKey}`,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

const DRIVE = google.drive({ version: "v3", auth });

module.exports = {
  pathToKey,
  DATA_DIR,
  MAIN_FOLDER,
  auth,
  DRIVE,
  clolor,
};
