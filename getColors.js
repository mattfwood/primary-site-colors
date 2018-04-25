const Vibrant = require('node-vibrant');

const getColors = filePath => {
  return new Promise((resolve, reject) => {
    const vibrant = new Vibrant(filePath);

    vibrant.getPalette((err, palette) => {
      if (err) reject(err);
      // return palette;
      resolve(palette);
    });
  });
};

module.exports = getColors;
