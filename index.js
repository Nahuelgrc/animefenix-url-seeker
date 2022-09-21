require("dotenv").config();
const { chromium } = require("playwright");
const fs = require("fs");
var os = require("os");
const { exit } = require("process");

(async () => {
  const limit = process.env.LIMIT;
  const username = process.env.USER;
  const password = process.env.PASSWORD;
  const animeName = process.env.ANIMENAME;
  const storageName = process.env.STORAGENAME || "mega";
  const folder = process.env.FOLDER || "links";

  // Setup
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const login = async () => {
    const loginPage = "https://www.animefenix.com/user/login";
    await page.goto(loginPage);
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);

    const buttonLogin = await page.locator("#send_button");
    await buttonLogin.click();

    try {
      await page.waitForNavigation({ timeout: 5000 });
    } catch (error) {
      if (page.url() === loginPage) {
        console.error("Username or password are wrong");
        exit();
      }
    }
  };

  const checkForFile = async () => {
    if (!fs.existsSync(folder)) {
      console.info("Folder does not exists - Creating");
      fs.mkdirSync(folder);
    } else {
      if (fs.existsSync(`${folder}/${animeName}`)) {
        console.info("File already exists - Attaching links");
      }
    }
  };

  const getLink = async (numberChapter) => {
    await page.goto(
      `https://www.animefenix.com/ver/${animeName}-${numberChapter}/descarga`
    );

    const megaElement = page
      .locator(".button", { hasText: storageName })
      .first();

    const link = await megaElement.getAttribute("href", { timeout: 5000 });
    await page.goto(link);

    return page.url();
  };

  await login();
  await checkForFile();

  const writer = fs.createWriteStream(`./links/${animeName}.txt`, {
    flags: "a", // 'a' means appending (old data will be preserved)
  });
  writer.write(`---------------------------------------------${os.EOL}`);

  for (let numberChapter = 1; numberChapter <= limit; numberChapter++) {
    try {
      const link = await getLink(numberChapter);
      console.info(`Writing link ${link}`);
      writer.write(link + os.EOL);
    } catch (error) {
      const errorText =
        `---------------------------` +
        os.EOL +
        `Error in chapter: ${numberChapter}: ${error}` +
        os.EOL +
        `---------------------------` +
        os.EOL;
      writer.write(errorText);
      console.error(errorText);
      continue;
    }
  }

  await browser.close();
})();
