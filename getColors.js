const Vibrant = require('node-vibrant');

const getColors = (filePath) => {
  const vibrant = new Vibrant(filePath);

  vibrant.getPalette((err, palette) => {
    if (err) throw err;
    console.log(palette);
  });
};

module.exports = getColors;