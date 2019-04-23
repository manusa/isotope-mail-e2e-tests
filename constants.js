const {sep} = require('path');

const browserId = process.env.BROWSER_ID || 'default';

const REPORTS_LOCATION = `.${sep}build${sep}reports`;
const JSON_REPORT = `${REPORTS_LOCATION}${sep}${browserId}.cucumber_report.json`;
const PUBLIC_LOCATION = `.${sep}build${sep}public`;
const BROWSERS = {
  chrome: {
    browserName: 'Chrome',
    browserVersion: '73.0',
    os: 'Windows',
    osVersion: '10',
    resolution : '1920x1080'
  },
  firefox: {
    browserName: 'Firefox',
    browserVersion: '66.0',
    os: 'Windows',
    osVersion: '10',
    resolution : '1920x1080'
  },
  edge: {
    browserName: 'Edge',
    browserVersion: '18.0',
    os: 'Windows',
    osVersion: '10',
    resolution : '1920x1080'
  },
  // iPhone: {
  //   browserName: 'iPhone',
  //   os: 'ios',
  //   osVersion: '11',
  //   deviceName: 'iPhone X'
  // },
  android: {
    browserName: 'android',
    os: 'android',
    osVersion: '7.0',
    deviceName: 'Samsung Galaxy S8'
  },
};

module.exports =  {
  REPORTS_LOCATION,
  JSON_REPORT,
  PUBLIC_LOCATION,
  BROWSERS,
};
