const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

const getScreenshot = require('./getScreenshot');
const getColors = require('./getColors');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  try {
    const { url } = req.query;
    const timestamp = Date.now();
    await getScreenshot(url, `${timestamp}.png`, {
      height: 800,
      width: 1280,
    });

    const colors = await getColors(`${timestamp}.png`)
    res.render('colors', { colors: colors });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
