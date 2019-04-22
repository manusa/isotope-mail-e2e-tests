const {Given, Then, When} = require('cucumber');
const {By, until, Key} = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;

let url;
let driver;


////////////////////////////////////////////////////////////////////////////////
// Fixed route exists for login page (<browser>)
Given(/^([a-z]*?) browser and a fixed login route URL (.*)$/,
  function(browser, givenUrl) {
    const world = this;
    url = givenUrl;
    driver = world.driver[browser];
  });
When(/^I access this URL to login$/, function() {
  driver.get(url);
});
Then(/^I'm shown a login page with a form to input my credentials$/,
  async function() {
    const world = this;
    const loginPage = await driver.wait(until.elementLocated(By.css('div[class^="login--background"]')));
    const title = await loginPage.findElement(By.css('h1'));
    expect(await title.getAttribute('innerHTML')).to.equal('Isotope Mail ClienFAILt');
    const screenShot = await driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  });

////////////////////////////////////////////////////////////////////////////////
// Root URL redirects to login page if no session was started
Given(/^Isotope's base URL (.*)$/,
  function(givenUrl) {
    const world = this;
    url = givenUrl;
    driver = world.driver.chrome;
  });
When(/^I access this URL without a session$/, function() {
  driver.get(url);
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
Given(/^([a-z]*?) browser and a login form in the URL (.*)$/,
  async function(browser, givenUrl) {
    const world = this;
    driver = world.driver[browser];
    driver.get(givenUrl);
    await driver.wait(until.elementLocated(By.css('div[class^="login--background"]')));
  });
When(/^I fill in and submit the login form$/,
  async function() {
    const serverHost = await driver.findElement(By.css('#serverHost'));
    serverHost.sendKeys('isotope');
    const user = await driver.findElement(By.css('#user'));
    user.sendKeys('isotope');
    const password = await driver.findElement(By.css('#password'));
    password.sendKeys('demo');
    const advancedButton = driver.findElement(By.css('button[class^="mdc-button advancedButton"]'));
    await advancedButton.click();
    const smtpPort = await driver.findElement(By.css('#smtpPort'));
    smtpPort.sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, '25');
    const smtpSsl = await driver.findElement(By.css('#smtpSsl'));
    smtpSsl.click();
    const loginButton = await driver.wait(until.elementLocated(By.css('button[class^="mdc-button loginButton"]')));
    await loginButton.click();
  });
Then(/^I'm logged in and redirected to the main application page$/,
  async function() {
    const world = this;
    await driver.wait(until.elementLocated(By.css('div[class^="messageList"]')));
    const screenShot = await driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  });
