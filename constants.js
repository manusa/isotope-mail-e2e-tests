const {sep} = require('path');

const REPORTS_LOCATION = `.${sep}build${sep}reports`;
const JSON_REPORT = `${REPORTS_LOCATION}${sep}cucumber_report.json`;

module.exports =  {
  REPORTS_LOCATION,
  JSON_REPORT,
};
