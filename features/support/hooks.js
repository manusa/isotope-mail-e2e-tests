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
Before(async function (scenario) {
  const world = this;
  world.driver = driver;
  driver.manage().deleteAllCookies();
  let handles = await driver.getAllWindowHandles();
  if (handles.length > 1) {
    await driver.close();
    await driver.switchTo().window(handles[0]);
  }
  await driver.executeScript("window.open();");
  handles = await driver.getAllWindowHandles();
  await driver.switchTo().window(handles[handles.length - 1]);
  console.log(`Scenario "${scenario.pickle.name}" is ready for browser (${browserId})`);
});
After(async function (testCase) {
  const world = this;
  if (testCase.result.status === Status.FAILED) {
    const screenShot = await world.driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  }
});
AfterAll(async function() {
  driver.quit();
});
