import fs from "fs";

const settings = {
  localesPath: "src/locales",
};

const scripts = {
  setResources: function () {
    const imports = [];
    const resources = {};
    fs.readdir(settings.localesPath, function (err, filenames) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(filenames);
      filenames.forEach(function (filename) {
        const dirPath = settings.localesPath + "/" + filename;
        let stats = fs.statSync(dirPath);

        if (stats.isDirectory()) {
          console.log("is dir:", dirPath);
          fs.readdir(dirPath, function (err, filenames) {
            filenames.forEach(function (namespace) {
              const fileName = filename + "_" + namespace;
              imports = [
                ...imports,
                {
                  path: `${settings.localesPath}/${filename}/${namespace}.json`,
                  fileName,
                  lang: filename,
                  namespace,
                },
              ];
              resources = {
                ...resources,
                [filename]: {
                  [namespace]: fileName,
                },
              };
            });
          });
        } else {
          console.log("is not dir:", dirPath);
        }
      });
    });
  },
};

const args = process.argv.slice(2);

if (args.length) scripts[args[0]]();
