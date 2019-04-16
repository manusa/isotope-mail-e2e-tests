const fs = require('fs');
const {sep} = require('path');
const {REPORTS_LOCATION, JSON_REPORT} = require('./constants.js');

// Set defaults
const cucumber = {
  default: `-f summary -f json:${JSON_REPORT} --format-options '{"snippetInterface": "synchronous"}'`,
  REPORTS_LOCATION,
  JSON_REPORT
};

// Prepare environment
if (fs.existsSync(JSON_REPORT)){
  fs.unlinkSync(JSON_REPORT);
}
REPORTS_LOCATION.split(sep)
  .reduce((acc, dir) => {
    const currentDir = `${acc}${dir}${sep}`;
    if (!fs.existsSync(currentDir)){
      fs.mkdirSync(currentDir);
    }
    return currentDir;
  }, '');


module.exports = cucumber;
