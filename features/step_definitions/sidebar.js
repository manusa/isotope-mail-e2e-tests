const {When, Then} = require('cucumber');
const {By, until} = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;

////////////////////////////////////////////////////////////////////////////////
// Sidebar is expanded by default
When(/^I'm in the main view$/, async function() {
  const world = this;
  await world.driver.wait(until.elementLocated(By.css('div[class^="messageList"]')));
});

Then(/^Sidebar is expanded by default$/, async function() {
  const world = this;
  const sideBar = await world.driver.wait(until.elementLocated(By.css('aside[class^="side-bar"]')));
  expect((await sideBar.getRect()).width).to.equal(240);
  const screenShot = await world.driver.takeScreenshot();
  world.attach(screenShot, 'image/png');
});
