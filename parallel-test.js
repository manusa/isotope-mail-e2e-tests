#!/usr/bin/env node
const childProcess = require('child_process');
const {BROWSERS} = require('./constants.js');

console.log(process.argv[0]);
console.log(process.argv[1]);

for (let browser in BROWSERS) {
  const env = {...process.env};
  env.BROWSER_ID = browser;
  console.log(`Launching child process for ${browser} tests`);
  childProcess.fork('./node_modules/cucumber/bin/cucumber-js', [], {env});
}
