const fs = require("fs");
const { clolor } = require("./constants");
// downloadToDir(testFile, "01_advice");
module.exports = {
  getFileList: function (folderName = null) {
    let pathname = `${DATA_DIR}`;
    if (folderName) {
      pathname = `${DATA_DIR}/${folderName}`;
    }
    return new Promise((resolve, reject) => {
      fs.readdir(pathname, (err, files) => {
        if (err) {
          console.log(clolor.red, `Cant read directory: `, err);
          resolve(null);
        }
        resolve(files);
      });
    });
  },
};
