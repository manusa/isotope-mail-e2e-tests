const {JSON_REPORT} = require('./constants.js');

// Set defaults
const cucumber = {
  default: `-f summary -f json:${JSON_REPORT} --format-options '{"snippetInterface": "synchronous"}'`,
};

module.exports = cucumber;
