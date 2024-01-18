const axios = require('axios');

const getColourPalette = (req, res) => {
   return res.json({"colors": ["Pink", "Blue"]});
};

module.exports = { getColourPalette };
