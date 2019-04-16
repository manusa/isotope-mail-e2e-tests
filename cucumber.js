const fs = require('fs');
const {sep} = require('path');

const reportsLocation = `.${sep}build${sep}reports`;

// Set defaults
const cucumber = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`
};

// Prepare environment
reportsLocation.split(sep)
  .reduce((acc, dir) => {
    const currentDir = `${acc}${dir}${sep}`;
    if (!fs.existsSync(currentDir)){
      fs.mkdirSync(currentDir);
    }
    return currentDir;
  }, '');


module.exports = cucumber;
