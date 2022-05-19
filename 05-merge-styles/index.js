const fs = require('fs');
const path = require('path');

fs.readdir('./05-merge-styles/styles', {withFileTypes: true}, (err, files) => {
  if (err)
    console.log(err);
  else {  
    let data = '';
    files.forEach(file => {
      if (file.isFile()) {
        let ext = file.name.split('.');
        if (ext[1] == 'css') {
          const input = fs.createReadStream(path.resolve('./05-merge-styles/styles', file.name), 'utf-8');
          const output = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');
          input.on('data', chunk => data += chunk);
          input.on('end', () => output.write(data));
          
        }
      }
    });}
});