
const {After, Before, setDefaultTimeout} = require('cucumber');
const webdriver = require('selenium-webdriver');

const TIMEOUT = 60*1000;
const travisBuild = process.env.TRAVIS_BUILD_NUMBER;
const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;


setDefaultTimeout(TIMEOUT);

const createBrowserStackSession = () =>
  new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities({
    projectName : 'Isotope Mail Client',
    buildName: travisBuild ? travisBuild : 'local',
    browserName: 'Edge',
    browserVersion: '18.0',
    'bstack:options': {
      userName: username,
      accessKey: accessKey,
      os: 'Windows',
      osVersion : '10',
      resolution : '1920x1080',
    },
  })
  .build();

Before(function (scenario, callback) {
  const world = this;
  world.driver = createBrowserStackSession();
  callback();
});

After(function (scenario, callback) {
  this.driver.quit();
  callback();
});
