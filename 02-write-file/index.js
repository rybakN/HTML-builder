const { stdout, stdin, exit } = process;
const fs = require('fs');

const output = fs.createWriteStream('./02-write-file/text.txt');

stdout.write('Привет! Введите текст:\n');

stdin.on('data', chunk => {
  if (chunk.includes('exit')) {
    exit();
  } else output.write(chunk);
});

process.on('exit', () => stdout.write('Пока, пока!'));
process.on('SIGINT', () => {
  exit();
});

