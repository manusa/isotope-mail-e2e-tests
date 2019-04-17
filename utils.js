const fs = require('fs');
const {sep} = require('path');

const deleteDirectory = directory => {
  if (fs.existsSync(directory)){
    const entries = fs.readdirSync(directory);
    entries.forEach(entry => {
      const file = `${directory}${sep}${entry}`;
      if (fs.lstatSync(file).isDirectory()) {
        deleteDirectory(file);
        fs.rmdirSync(file);
      } else {
        fs.unlinkSync(file);
      }
    });
  }
};

const mkdirRecursive = directory => directory
  .split(sep)
  .reduce((acc, dir) => {
    const currentDir = `${acc}${dir}${sep}`;
    if (!fs.existsSync(currentDir)){
      fs.mkdirSync(currentDir);
    }
    return currentDir;
  }, '');

module.exports = {
  deleteDirectory,
  mkdirRecursive,
};
