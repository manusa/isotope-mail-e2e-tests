#!/usr/bin/env node
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const {sep} = require('path');
const {REPORTS_LOCATION, JSON_REPORT, PUBLIC_LOCATION} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');
const localEnv = process.env.TRAVIS_BUILD_NUMBER ? false : true;

const outputFile = `${REPORTS_LOCATION}${sep}cucumber_report.html`;

const options = {
  theme: 'bootstrap',
  jsonFile: JSON_REPORT,
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: localEnv,
  metadata: {
    "App Version":"0.3.2",
    "Test Environment": "STAGING",
    "Browser": "Chrome  54.0.2840.98",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);

deleteDirectory(PUBLIC_LOCATION);
mkdirRecursive(PUBLIC_LOCATION);
fs.copyFileSync(outputFile, `${PUBLIC_LOCATION}${sep}index.html`);
