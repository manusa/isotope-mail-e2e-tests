#!/usr/bin/env node
const childProcess = require('child_process');
const {BROWSERS, REPORTS_LOCATION} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');


// Prepare environment
deleteDirectory(REPORTS_LOCATION);
mkdirRecursive(REPORTS_LOCATION);

let globalExitCode = 0;
const finishedProcesses = [];

for (let browser in BROWSERS) {
  const env = {...process.env};
  env.BROWSER_ID = browser;
  console.log(`Launching child process for ${browser} tests`);
  const child = childProcess.fork('./node_modules/cucumber/bin/cucumber-js', [], {
    env,
    stdio: 'inherit'
  });
  child.on('exit', (code) => {
    console.log(`Child process for ${browser} finished with code ${code}`);
    if (code > 0){
      globalExitCode = 1;
    }
    finishedProcesses.push(browser);
  });
}

async function waitForCompletion() {
  while (finishedProcesses.length !== Object.keys(BROWSERS).length) {
    await  new Promise(done => setTimeout(done, 500));
  }
  console.log(`All browser processes have completed!`)
  process.exitCode = globalExitCode;
}

waitForCompletion();
