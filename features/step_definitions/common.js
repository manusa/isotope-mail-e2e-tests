const {Given} = require('cucumber');
const {By, until, Key} = require('selenium-webdriver');

const login = async (driver) => {
  const container = await driver.wait(until.elementLocated(By.css('div[class^="login--container"]')));
  const serverHost = await container.findElement(By.css('#serverHost'));
  serverHost.sendKeys('isotope');
  const user = await container.findElement(By.css('#user'));
  user.sendKeys('isotope');
  const password = await container.findElement(By.css('#password'));
  password.sendKeys('demo');
  const advancedButton = container.findElement(By.css('button[class^="mdc-button advancedButton"]'));
  await advancedButton.click();
  const smtpPort = await container.findElement(By.css('#smtpPort'));
  smtpPort.sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, '25');
  const smtpSsl = await container.findElement(By.css('#smtpSsl'));
  smtpSsl.click();
  const loginButton = await driver.wait(until.elementLocated(By.css('button[class^="mdc-button loginButton"]')));
  await driver.executeScript("arguments[0].scrollIntoView();", loginButton);
  await loginButton.click();
};

// /////////////////////////////////////////////////////////////////////////////
// Application login
Given(/^Main application URL (.*)$/,
  function(givenUrl) {
    const world = this;
    world.isotopeUrl = givenUrl;
  });
Given(/^I login to the application$/,
  async function() {
    const world = this;
    const {driver, isotopeUrl} = world;
    await driver.get(isotopeUrl);
    await driver.wait(until.elementLocated(By.css('div[class^="login--background"]')));
    await login(driver);
});




module.exports =  {
  login,
};
