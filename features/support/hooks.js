const {BROWSERS} = require('../../constants.js');
const {After, Before, BeforeAll, AfterAll, Status, setDefaultTimeout} = require('cucumber');
const webdriver = require('selenium-webdriver');

const TIMEOUT = 60*1000;
const travisBuild = process.env.TRAVIS_BUILD_NUMBER;
const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
const browserId = process.env.BROWSER_ID;

setDefaultTimeout(TIMEOUT);

const createBrowserStackSession = (browser = BROWSERS.edge) =>
  new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities({
    projectName: 'Isotope Mail Client',
    buildName: travisBuild ? 'CI' : 'local',
    browserName: browser.browserName,
    browserVersion: browser.browserVersion,
    device: browser.deviceName,
    realMobile: true,
    'bstack:options': {
      userName: username,
      accessKey: accessKey,
      os: browser.os,
      osVersion: browser.osVersion,
      resolution: browser.resolution,
      deviceName: browser.deviceName,
    },
  })
  .build();

let driver;

BeforeAll(function() {
  driver = createBrowserStackSession(BROWSERS[browserId]);
});
Before(async function () {
  const world = this;
  world.driver = driver;
  driver.manage().deleteAllCookies();
});
AfterAll(function() {
  driver.quit();
});
After(async function (testCase) {
  const world = this;
  if (testCase.result.status === Status.FAILED) {
    // NO EASY WAY TO DETERMINE CURRENT BROWSER AT THIS POINT
    // const screenShot = await world.driver.takeScreenshot();
    // world.attach(screenShot, 'image/png');
  }
});
