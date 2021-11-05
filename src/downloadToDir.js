const { DRIVE, clolor, DATA_DIR } = require("./constants");
const fs = require("fs");
module.exports = {
  downloadToDir: function (file, categoryFolder) {
    // https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/drive/download.js
    return new Promise((resolve, reject) => {
      const { id, name } = file;
      console.log(
        clolor.cyan,
        `starting download of ${name} to ${categoryFolder}`,
      );
      DRIVE.files
        .get(
          {
            fileId: id,
            alt: "media",
          },
          { responseType: "stream" },
        )
        .then((res) => {
          const dest = fs.createWriteStream(
            `${DATA_DIR}/${categoryFolder}/${name}`,
          );
          let progress = 0;
          console.log(clolor.white, "");
          res.data
            .on("end", () => {
              console.log(
                clolor.green,
                "\ndone downloading...\n-----------------------",
              );
              resolve(name);
            })
            .on("error", function (err) {
              console.log(clolors.red, "\nError during download", err);
            })
            .on("data", (d) => {
              progress += d.length;
              if (process.stdout.isTTY) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(
                  `${name}: ${progress} of ${res.headers["content-length"]}`,
                );
              }
            })
            .pipe(dest);
        });
    });
  },
};
