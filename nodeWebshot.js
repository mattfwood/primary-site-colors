const webshot = require('webshot');

function getScreenshot(url, fileName) {
  return new Promise((resolve, reject) => {
    const options = {
      screenSize: {
        width: 1920,
        height: 1080,
      },
      // shotSize: {
      //   width: 320,
      //   height: 'all',
      // },
      // , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
      //   + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    };

    webshot(url, `./screenshots/${fileName}.png`, options, function (error) {
      if (error) reject(new Error(error));
      resolve(fileName);
    });

  });
}

module.exports = getScreenshot;
