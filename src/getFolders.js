const { DRIVE, MAIN_FOLDER, clolor } = require("./constants");

module.exports = {
  getFolders: function () {
    return new Promise(async (resolve, reject) => {
      await DRIVE.files.list(
        {
          q: `'${MAIN_FOLDER}' in parents`,
        },
        (err, file) => {
          if (err) {
            console.log(clolor.red, err);
            reject(err);
          }
          resolve(file.data.files);
        },
      );
    });
  },
};
