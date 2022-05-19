const fs = require('fs');
const path = require('path');

function copyDir () {
  fs.exists('./04-copy-directory/files-copy', (err) => {
    if (err) {
      
    }
  });

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
