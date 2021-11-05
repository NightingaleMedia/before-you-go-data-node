const { DATA_DIR, clolor } = require("./constants");
const { getFileList } = require("./getFileList");
const fs = require("fs");
module.exports = {
  generateManifest: async function () {
    console.log("Removing old manifest...");
    //   delete the old manifest
    await fs.rm(`${DATA_DIR}/manifest.json`, (err) => {
      if (err) {
        //   we dont care about this error
        console.log(`Error removing manifest`);
      }
    });
    let manifest = {};
    const allFolders = await getFileList();

    await Promise.all(
      allFolders.map(async (folder) => {
        if (folder === ".DS_Store") {
          return;
        }
        const allFilesInFolder = await getFileList(folder);
        if (allFilesInFolder) {
          manifest[parseInt(folder.slice(0, 2))] = {
            description: "",
            name: folder,
            index: parseInt(folder.slice(0, 2)),
            files: [...allFilesInFolder],
          };
        }
      }),
    );
    console.log("Generating manifest...");
    fs.writeFile(
      `${DATA_DIR}/manifest.json`,
      JSON.stringify(manifest),
      (err) => {
        if (err) {
          console.log(
            clolor.red,
            `There was an error generating manifest: ${err}`,
          );
          throw err;
        }
        console.log(clolor.white, "DONE babby");
      },
    );
  },
};
