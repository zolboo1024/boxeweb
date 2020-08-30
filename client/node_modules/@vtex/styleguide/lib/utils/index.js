"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childrenOf = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var childrenOf = exports.childrenOf = function childrenOf() {
  for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  var fieldType = _propTypes2.default.shape({
    type: _propTypes2.default.oneOf(types)
  });

  return _propTypes2.default.oneOfType([fieldType, _propTypes2.default.arrayOf(fieldType)]);
};