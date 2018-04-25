const puppeteer = require('puppeteer');

async function getScreenshot(url, fileName, viewport) {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport(viewport);
    await page.screenshot({ path: fileName });
    return `${fileName} screenshot saved`;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getScreenshot;
