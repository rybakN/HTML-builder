const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if (file.isFile()) {
        let tochka = file.name.split('.');
        fs.stat(path.resolve('./03-files-in-folder/secret-folder', file.name), (err, stats) => {
          let size = stats.size/1000;
          console.log(`${tochka[0]} - ${tochka[1]} - ${size}kb`);
        } );
      }
    });}
});
