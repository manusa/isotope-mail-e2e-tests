const {Given, Then, When} = require('cucumber');
const {By, until} = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;

let url;
let driver;
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
    expect(await title.getAttribute('innerHTML')).to.equal('Isotope Mail Client');
    const screenShot = await driver.takeScreenshot();
    world.attach(screenShot, 'image/png');
  });
