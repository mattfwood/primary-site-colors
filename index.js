const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

const getScreenshot = require('./getScreenshot');
const getColors = require('./getColors');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
