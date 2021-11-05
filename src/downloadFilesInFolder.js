const { clolor, DRIVE } = require("./constants");
const { downloadToDir } = require("./downloadToDir");
const { getFileList } = require("./getFileList");

module.exports = {
  downloadFilesInFolder: async function (folder) {
    console.log(clolor.cyan, `\nDownloading audio files in ${folder.name}\n\n`);
    return new Promise(async (resolve, reject) => {
      const discoveredFolder = await new Promise((resolve, reject) => {
        DRIVE.files.list(
          {
            q: `'${folder.id}' in parents`,
          },
          (err, audioFolder) => {
            if (err) {
              throw reject(err);
            }
            return resolve(audioFolder.data.files);
          },
        );
      });

      // list of files in existing folder
      const existingFolder = await getFileList(folder.name);
      let length = discoveredFolder.length;
      let i = 0;
      for (i; i < length; i++) {
        //see if it is already there
        if (existingFolder.indexOf(discoveredFolder[i].name) === -1) {
          //if its not then download it
          await downloadToDir(discoveredFolder[i], folder.name);
        } else {
          console.log(
            clolor.yellow,
            `  -- Not downloading ${discoveredFolder[i].name} as it already exists.`,
          );
        }
      }
      //   last thing to do is delete stuff that is not in that folder

      //get a list of strings in the drive folder
      let nameList = discoveredFolder.reduce((arr, file) => {
        return [file.name, ...arr];
      }, []);

      // if a string exists in the folder but not on drive, delete it
      existingFolder.forEach((file) => {
        if (nameList.indexOf(file) === -1) {
          console.log("DELETE: ", file);
          if (file === "tmp") {
            return;
          }
          fs.rm(`${DATA_DIR}/${folder.name}/${file}`, (err) => {
            if (err) throw err;
          });
        }
      });
      resolve(existingFolder);
    });
  },
};
