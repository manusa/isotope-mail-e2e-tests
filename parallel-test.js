#!/usr/bin/env node
const childProcess = require('child_process');
const {BROWSERS, REPORTS_LOCATION} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');


// Prepare environment
deleteDirectory(REPORTS_LOCATION);
mkdirRecursive(REPORTS_LOCATION);

for (let browser in BROWSERS) {
  const env = {...process.env};
  env.BROWSER_ID = browser;
  console.log(`Launching child process for ${browser} tests`);
  childProcess.fork('./node_modules/cucumber/bin/cucumber-js', [], {
    env,
    stdio: 'inherit'
  });
}
