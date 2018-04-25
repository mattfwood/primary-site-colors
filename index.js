const puppeteer = require('puppeteer');
const getColors = require('./getColors');

async function getScreenshot(page, fileName, viewport) {
  try {
    await page.setViewport(viewport);
    await page.screenshot({ path: fileName });
    return `${fileName} screenshot saved`;
  } catch (error) {
    throw new Error(error);
  }
}

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://myutilities.com/');

    Promise.all([
      getScreenshot(page, 'iphone-7.png', {
        height: 667,
        width: 375,
        isMobile: true
      }),
      getScreenshot(page, 'iphone-7-plus.png', {
        height: 736,
        width: 414,
        isMobile: true
      }),
      getScreenshot(page, 'iphone-X.png', {
        height: 812,
        width: 375,
        isMobile: true
      }),
      getScreenshot(page, 'ipad.png', {
        height: 1024,
        width: 768,
        isMobile: true
      }),
      getScreenshot(page, 'ipad-pro.png', {
        height: 1366,
        width: 1024,
        isMobile: true
      })
    ]).then(response => {
      browser.close();
      console.log('function complete');
      getColors('./iphone-X.png');
    });
  } catch (error) {
    console.error(new Error(error));
  }
})();
