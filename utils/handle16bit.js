const { DATA_DIR, getFileList, clolor } = require("../index");
const fs = require("fs");
const { spawn } = require("child_process");

function convert16Bit(folder) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(clolor.cyan, "Converting to 16 bit: " + folder);
      const convert = spawn(
        `cd ${DATA_DIR}/${folder} &&\
        for i in *.wav; do name=\`echo "$i"\`
        echo "$name"
        ffmpeg \
            -i "$i" \
            -af highpass=f=200,acompressor=threshold=0.08:ratio=12:attack=200:release=2000:level_in=3,alimiter=level_in=3:limit=1 \
            -sample_fmt s16 \
            "tmp/\${name}" -y
        done
            && cd ../../`,
        {
          shell: true,
        }
      );
      convert.on("data", (data) => {
        console.log(`stdout: ${data}`);
      });
      convert.on("error", (err) => {
        console.log(`err: ${err}`);
        reject(err);
      });
      convert.on("close", (code) => {
        console.log(`converted files in: ${folder}`);
        resolve(code);
      });
    } catch (error) {
      resolve(error);
    }
  });
}

async function handle16Bit() {
  const allFolders = await getFileList();
  return new Promise(async (resolve, reject) => {
    await Promise.all(
      allFolders.map(async (folder) => {
        if (folder === ".DS_Store") {
          return;
        }
        try {
          await fs.mkdir(
            `${DATA_DIR}/${folder}/tmp`,
            { recursive: true },
            (err) => {
              if (err) console.log(err);
            }
          );

          await convert16Bit(folder);
        } catch (error) {
          console.log("error making tmp file", error);
        }
      })
    );
    await Promise.all(
      allFolders.map(async (folder) => {
        console.log(clolor.cyan, "Removing 24 bit");
        // rmove all the 24 bit ones
        await fs.readdir(`${DATA_DIR}/${folder}`, (err, files) => {
          if (err) console.log(clolor.red, "err remove 24 bit", err);
          files && files.length > 0
            ? files.forEach(async (file) => {
                if (file !== "tmp") {
                  console.log("deleting 24 bit file: ", file);
                  await fs.rmSync(`${DATA_DIR}/${folder}/${file}`);
                }
              })
            : null;
        });
        // copy all the 16 bit to the 24 file
        await fs.readdir(`${DATA_DIR}/${folder}/tmp`, (err, files) => {
          if (err) console.log(clolor.red, err);
          files && files.length > 0
            ? files.forEach(async (file) => {
                await fs.copyFileSync(
                  `${DATA_DIR}/${folder}/tmp/${file}`,
                  `${DATA_DIR}/${folder}/${file}`
                );
              })
            : null;
        });
        // finally just delete the tmp
        await fs.rm(`${DATA_DIR}/${folder}/tmp`, { recursive: true }, (err) => {
          if (err) console.log(err);
        });
      })
    );
    resolve("yed");
  });
}

module.exports = { convert16Bit, handle16Bit };
