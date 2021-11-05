const { exec } = require("child_process");
const fs = require("fs");
const { clolor, MAIN_FOLDER, DRIVE } = require("./src/constants");
const { downloadFilesInFolder } = require("./src/downloadFilesInFolder");
const { generateManifest } = require("./src/generateManifest");
const { getFileList } = require("./src/getFileList");
const { getFolders } = require("./src/getFolders");

// Get All the Folders
getFolders()
  .then(async (folders) => {
    let length = folders.length;
    let i = 0;
    fs.rm(`${DATA_DIR}/manifest.json`, (err) => {
      if (err) console.log(err);
    });
    folders.map(async (folder) => {
      if (!fs.existsSync(`${DATA_DIR}/${folder.name}`)) {
        fs.mkdirSync(`${DATA_DIR}/${folder.name}`);
      }
    });
    for (i; i < length; i++) {
      await downloadFilesInFolder(folders[i]);
    }
  })
  .then(() => {
    console.log("processing the audio...");
    return new Promise((resolve, reject) => {
      const handleBit = exec("bash ./bitrate.sh");
      handleBit.stdout.on("message", (m) => {
        console.log(m);
      });
      handleBit.stdout.on("error", (err) => {
        console.log("err: ", err);
        reject(err);
      });
      handleBit.on("close", () => {
        console.log("done processing audio");
        resolve();
      });
    });
  })
  .catch((err) => {
    console.log(clolor.red, err);
    throw err;
  })
  .finally(() => {
    console.log(clolor.white, "finally...");
    generateManifest();
  });
