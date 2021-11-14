const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

let driver;
let filePath = "http://localhost:3000/";

afterEach(async () => {
  //await driver.quit();
});

test("correct inputs", async () => {
  driver = await new Builder().forBrowser("chrome").build();

  await driver.get(filePath);

  await driver.findElement(By.id("txtFirstName")).sendKeys("Jason");
  await driver.findElement(By.id("txtLastName")).sendKeys("Mamoa");
  await driver
    .findElement(By.name("selectGender"))
    .sendKeys(Key.RETURN, Key.DOWN, Key.RETURN);
  await driver
    .findElement(By.name("selectState"))
    .sendKeys(
      Key.RETURN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.DOWN,
      Key.RETURN
    );
  await driver.findElement(By.id("txtEmail")).sendKeys("jason@gmail.com");
  await driver.findElement(By.id("txtPhone")).sendKeys("5157043322");
  await driver.findElement(By.id("txtAddress")).sendKeys("Ames,IA");

  await driver.findElement(By.id("btnValidate")).click();

  expect(
    await driver.findElement(By.id("labelNotifytxtFinalResult")).getText()
  ).toBe("OK");
});
