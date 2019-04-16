#!/usr/bin/env node
const reporter = require('cucumber-html-reporter');
const {sep} = require('path');
const {JSON_REPORT, REPORTS_LOCATION} = require('./cucumber.js');

const options = {
  theme: 'bootstrap',
  jsonFile: JSON_REPORT,
  output: `${REPORTS_LOCATION}${sep}cucumber_report.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
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
