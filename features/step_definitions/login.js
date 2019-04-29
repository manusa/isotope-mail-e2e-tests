const {Given, Then, When} = require('cucumber');
const {By, until} = require('selenium-webdriver');
const {login} = require('./common');

const chai = require('chai');
const expect = chai.expect;
let url;
let driver;


////////////////////////////////////////////////////////////////////////////////
// Fixed route exists for login page (<browser>)
Given(/^a fixed login route URL (.*)$/,
  function(givenUrl) {
    const world = this;
    url = givenUrl;
    driver = world.driver;
  });
When(/^I access this URL to login$/, async function() {
  await driver.get(url);
});
Then(/^I'm shown a login page with a form to input my credentials$/,
  async function() {
    const world = this;
    const loginPage = await driver.wait(until.elementLocated(By.css('div[class^="login--background"]')));
    const title = await loginPage.findElement(By.css('h1'));
    expect(await title.getAttribute('innerHTML')).to.equal('Isotope Mail Client');
    const screenShot = await driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  });

////////////////////////////////////////////////////////////////////////////////
// Root URL redirects to login page if no session was started
Given(/^Isotope's base URL (.*)$/,
  function(givenUrl) {
    const world = this;
    url = givenUrl;
    driver = world.driver;
  });
When(/^I access this URL without a session$/, async function() {
  await driver.get(url);
});
Then(/^I'm redirected to the login page$/,
  async function() {
    const world = this;
    await driver.wait(until.elementLocated(By.css('div[class^="login--background"]')));
    await driver.wait(until.urlMatches(new RegExp(`^${url}/login$`)));
    const screenShot = await driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  });

////////////////////////////////////////////////////////////////////////////////
// I can login to the application (<browser>)
Given(/^a login form in the URL (.*)$/,
  async function(givenUrl) {
    const world = this;
    driver = world.driver;
    await driver.get(givenUrl);
    await driver.wait(until.elementLocated(By.css('div[class^="login--background"]')));
  });
When(/^I fill in and submit the login form$/, async function() {
  await login(driver);
});
Then(/^I'm logged in and redirected to the main application page$/,
  async function() {
    const world = this;
    await driver.wait(until.elementLocated(By.css('div[class^="messageList"]')));
    const screenShot = await driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  });
