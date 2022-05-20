const fs = require('fs');
const path = require('path');

/* ********************************** Создание папки project-dist **************************** */

function mkDir (path) {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) throw err;
  });
}


/* ********************************** Сборка стилей **************************** */
function packStyle (readPath, writePath) {
  fs.readdir(readPath, {withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {  
      let data = '';
      files.forEach(file => {
        if (file.isFile()) {
          let ext = file.name.split('.');
          if (ext[1] == 'css') {
            const input = fs.createReadStream(path.resolve(readPath, file.name), 'utf-8');
            const output = fs.createWriteStream(writePath);
            input.on('data', chunk => data += chunk);
            input.on('end', () => output.write(data));
            
          }
        }
      });}
  });
}

function copyFiles (pathDir, originPathFile) {

  fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(originPathFile, {withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.resolve(originPathFile, file.name),path.resolve(pathDir, file.name), (err) => {
            if (err) throw err;
          });
        }
      });}
  });
}


mkDir ('./06-build-page/project-dist');
mkDir ('./06-build-page/project-dist/assets');
mkDir ('./06-build-page/project-dist/assets/fonts');
mkDir ('./06-build-page/project-dist/assets/img');
mkDir ('./06-build-page/project-dist/assets/svg');
packStyle ('./06-build-page/styles', './06-build-page/project-dist/style.css');
copyFiles ('./06-build-page/project-dist/assets/fonts', './06-build-page/assets/fonts');
copyFiles ('./06-build-page/project-dist/assets/img', './06-build-page/assets/img');
copyFiles ('./06-build-page/project-dist/assets/svg', './06-build-page/assets/svg');