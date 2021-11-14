const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

let driver;
beforeEach(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/");
});

afterEach(async () => {
  await driver.quit();
});

test("all elements have rendered", async () => {
  expect(await driver.findElement(By.id("title")).getText()).toBe(
    "1: Scholar Meng Hao"
  );
  expect(await driver.findElement(By.id("currentWord")).getText()).toBe("The");
  expect(await driver.findElement(By.id("btn-backChapter")).getText()).toBe( "<<");
  expect(await driver.findElement(By.id("btn-skipBack")).getText()).toBe("<");
  expect(await driver.findElement(By.id("btn-slower")).getText()).toBe("-");
  expect(await driver.findElement(By.id("btn-pause")).getText()).toBe("Pause");
  expect(await driver.findElement(By.id("btn-faster")).getText()).toBe("+");
  expect(await driver.findElement(By.id("btn-skipAhead")).getText()).toBe(">");
  expect(await driver.findElement(By.id("btn-nextChapter")).getText()).toBe( ">>");
  expect(await driver.findElement(By.id("btn-skipAhead")).getText()).toBe(">");
  expect(await driver.findElement(By.id("progressIndicator")).getText()).toBe("Progress: 0%");
  expect(await driver.findElement(By.id("speedIndicator")).getText()).toBe("Speed: 150 WPM");
});

test("pressing pause pauses changes the text to Play", async () => {
  await driver.findElement(By.id("btn-pause")).click();
  expect(await driver.findElement(By.id("btn-pause")).getText()).toBe("Play");
});

test("pressing pause twice changes the text back to Pause", async () => {
  await driver.findElement(By.id("btn-pause")).click();
  await driver.findElement(By.id("btn-pause")).click();
  expect(await driver.findElement(By.id("btn-pause")).getText()).toBe("Pause");
});
