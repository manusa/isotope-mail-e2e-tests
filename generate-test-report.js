#!/usr/bin/env node
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const {REPORTS_LOCATION, PUBLIC_LOCATION} = require('./constants.js');
const {deleteDirectory, mkdirRecursive} =  require('./utils');
const localEnv = process.env.TRAVIS_BUILD_NUMBER ? false : true;

const outputFile = path.join(REPORTS_LOCATION, 'cucumber_report.html');


const options = {
  theme: 'bootstrap',
  jsonDir: REPORTS_LOCATION,
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: localEnv,
  name: "Isotope Mail Client e2e tests",
  brandTitle: "End-to-End tests",
  metadata: {
    "Project home": "<a href='https://github.com/manusa/isotope-mail'>Isotope Mail Client</a>",
    "Project tests home": "<a href='https://github.com/manusa/isotope-mail-e2e-tests'>Isotope Mail Client e2e tests</a>",
  }
};

// Remove consolidated report report json file
if (fs.existsSync(`${outputFile}.json`)) {
  fs.unlinkSync(`${outputFile}.json`);
}
// Pre-process report output
if (fs.existsSync(REPORTS_LOCATION)) {
  const entries = fs.readdirSync(REPORTS_LOCATION);
  entries.forEach(entry => {
    const match = entry.match(/([^.]+?).cucumber_report.json/);
    if (match) {
      const currentReportPath = path.join(REPORTS_LOCATION, entry);
      const jsonReport = JSON.parse(fs.readFileSync(currentReportPath));
      jsonReport.forEach(feature => {
        const suffix = ` (${match[1]})`;
        if (!feature.name.endsWith(suffix)) {
          feature.name = `${feature.name}${suffix}`;
        }
      });
      fs.writeFileSync(currentReportPath, JSON.stringify(jsonReport));
    }
  });
}


reporter.generate(options);

deleteDirectory(PUBLIC_LOCATION);
mkdirRecursive(PUBLIC_LOCATION);
fs.copyFileSync(outputFile, path.join(PUBLIC_LOCATION, 'index.html'));
