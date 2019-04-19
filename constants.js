const {sep} = require('path');

const ASSETS_LOCATION = `.${sep}assets`;
const SUCCESS_BADGE = `${ASSETS_LOCATION}${sep}e2e-tests-passing.png`;
const FAILURE_BADGE = `${ASSETS_LOCATION}${sep}e2e-tests-failing.png`;
const REPORTS_LOCATION = `.${sep}build${sep}reports`;
const JSON_REPORT = `${REPORTS_LOCATION}${sep}cucumber_report.json`;
const STATUS_BADGE = `${REPORTS_LOCATION}${sep}status_badge.png`;
const PUBLIC_LOCATION = `.${sep}build${sep}public`;

module.exports =  {
  ASSETS_LOCATION,
  SUCCESS_BADGE,
  FAILURE_BADGE,
  REPORTS_LOCATION,
  JSON_REPORT,
  STATUS_BADGE,
  PUBLIC_LOCATION,
};
