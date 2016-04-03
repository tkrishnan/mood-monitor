'use strict';

var Colors = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing = require('material-ui/lib/styles/spacing');
var zIndex = require('material-ui/lib/styles/zIndex');

var rawTheme =  {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.cyan400,
    primary2Color: Colors.cyanA200,
    primary3Color: Colors.cyan700,
    accent1Color: Colors.indigo400,
    accent2Color: Colors.blueGrey200,
    accent3Color: Colors.blueGrey700,
    textColor: Colors.indigo900,
    alternateTextColor: Colors.grey100,
    canvasColor: Colors.grey300,
    borderColor: Colors.bueGrey500,
    disabledColor: ColorManipulator.fade(Colors.indigo900, 0.5),
    pickerHeaderColor: Colors.cyan400
  }
};

module.exports =  rawTheme;