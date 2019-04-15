
const {After, Before, setDefaultTimeout} = require('cucumber');
const webdriver = require('selenium-webdriver');

const TIMEOUT = 60*1000;
const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;


setDefaultTimeout(TIMEOUT);

const createBrowserStackSession = () =>
  new webdriver.Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities({
    browserName: 'chrome',
    'browserstack.user': username,
    'browserstack.key': accessKey
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
