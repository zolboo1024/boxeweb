"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var calcIconSize = exports.calcIconSize = function calcIconSize(iconBase, newSize) {
  var isHorizontal = iconBase.width >= iconBase.height;
  var width = isHorizontal ? newSize : newSize * iconBase.width / iconBase.height;
  var height = !isHorizontal ? newSize : newSize * iconBase.height / iconBase.width;
  return {
    width: width,
    height: height
  };
};

var baseClassname = exports.baseClassname = function baseClassname(name, variation) {
  return "vtex__icon-" + name + " " + (variation ? "vtex__icon-" + name + "--" + variation : '');
};