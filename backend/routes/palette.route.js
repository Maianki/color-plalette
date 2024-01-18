const express = require('express');
const bodyParser = require('body-parser');
const paletteRoutes = express.Router();
const {
    getColourPalette
} = require("./../controllers/palette.controller.js")

paletteRoutes.use(bodyParser.urlencoded({ extended: false }));
paletteRoutes.use(bodyParser.json());

paletteRoutes.post('/colour-palette', getColourPalette);

module.exports = paletteRoutes;