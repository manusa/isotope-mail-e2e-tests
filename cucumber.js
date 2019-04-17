const {REPORTS_LOCATION, JSON_REPORT} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');

// Set defaults
const cucumber = {
  default: `-f summary -f json:${JSON_REPORT} --format-options '{"snippetInterface": "synchronous"}'`,
  REPORTS_LOCATION,
  JSON_REPORT
};

// Prepare environment
deleteDirectory(REPORTS_LOCATION);
mkdirRecursive(REPORTS_LOCATION);

module.exports = cucumber;
