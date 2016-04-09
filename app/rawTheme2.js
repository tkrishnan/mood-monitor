'use strict';

var Colors = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing = require('material-ui/lib/styles/spacing');
var zIndex = require('material-ui/lib/styles/zIndex');

var rawTheme2 =  {
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
    textColor: Colors.grey100,
    alternateTextColor: Colors.indigo900,
    canvasColor: Colors.grey300,
    borderColor: Colors.bueGrey500,
    disabledColor: ColorManipulator.fade(Colors.indigo900, 0.5),
    pickerHeaderColor: Colors.cyan400
  }
};

module.exports =  rawTheme2;