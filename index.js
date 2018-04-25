const express = require('express');
const getScreenshot = require('./getScreenshot');
const getColors = require('./getColors');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const { url } = req.query;
  getScreenshot(url, 'screenshot.png', {
    height: 667,
    width: 375,
    isMobile: true
  })
    .then(() => {
      return getColors('./screenshot.png');
    })
    .then(colors => {
      console.log(colors);
      res.render('colors', { colors: colors });
    })
    .catch(console.log);
});

app.listen(3000, () => console.log('App running on port 3000!'));
