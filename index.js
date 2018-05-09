const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

process.on('uncaughtException', function(err) {
  console.log(err);
});

const getScreenshot = require('./nodeWebshot');
const getColors = require('./getColors');

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  try {
    const { url } = req.query;
    const fileName = url.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    // const timestamp = Date.now();
    await getScreenshot(url, `${fileName}`);

    const colors = await getColors(`./screenshots/${fileName}.png`);
    res.json({ colors });
    // res.render('colors', { colors: colors });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
