const fs = require('fs');
const {SUCCESS_BADGE, STATUS_BADGE, REPORTS_LOCATION, JSON_REPORT} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');

// Set defaults
const cucumber = {
  default: `-f summary -f json:${JSON_REPORT} --format-options '{"snippetInterface": "synchronous"}'`,
};

// Prepare environment
deleteDirectory(REPORTS_LOCATION);
mkdirRecursive(REPORTS_LOCATION);

// Copy success badge
fs.copyFileSync(SUCCESS_BADGE, STATUS_BADGE);

module.exports = cucumber;
