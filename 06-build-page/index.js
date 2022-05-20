const fs = require('fs');
const path = require('path');

/* ********************************** Создание папки project-dist **************************** */
fs.mkdir('./06-build-page/project-dist', { recursive: true }, (err) => {
    if (err) throw err;
  });

/* ********************************** Сборка стилей **************************** */
fs.readdir('./06-build-page/styles', {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {  
    let data = '';
    files.forEach(file => {
      if (file.isFile()) {
        let ext = file.name.split('.');
        if (ext[1] == 'css') {
          const input = fs.createReadStream(path.resolve('./06-build-page/styles', file.name), 'utf-8');
          const output = fs.createWriteStream('./06-build-page/project-dist/style.css');
          input.on('data', chunk => data += chunk);
          input.on('end', () => output.write(data));
          
        }
      }
    });}
});


function copyDir () {
  
    fs.mkdir('./04-copy-directory/files-copy', { recursive: true }, (err) => {
      if (err) throw err;
    });
  
    fs.readdir('./04-copy-directory/files', {withFileTypes: true}, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          if (file.isFile()) {
            fs.copyFile(path.resolve('./04-copy-directory/files', file.name),path.resolve('./04-copy-directory/files-copy', file.name), (err) => {
              if (err) throw err;
            });
          }
        });}
    });
    fs.readdir('./04-copy-directory/files-copy', {withFileTypes: true}, (err, files) => {
      if (err)
        console.log(err);
      else {
        files.forEach(file => {
          if (file.isFile()) {
            fs.exists(path.resolve('./04-copy-directory/files', file.name), (err) => {
              if (!err) {
                fs.unlink(path.resolve('./04-copy-directory/files-copy', file.name), err => {
                  if (err) {
                    console.log(err);
                  } 
                });
              }
            });
          }
        });}
    });
  }
  
copyDir();