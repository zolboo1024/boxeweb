"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Clear = require("../icon/Clear");

var _Clear2 = _interopRequireDefault(_Clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ClearIndicator = function ClearIndicator(_ref) {
  var innerProps = _ref.innerProps;
  return _react2.default.createElement("div", _extends({
    className: "flex items-center h-100 pr4 pointer c-muted-3 hover-gray"
  }, innerProps), _react2.default.createElement(_Clear2.default, null));
};

ClearIndicator.propTypes = {
  innerProps: _propTypes2.default.object,
  selectProps: _propTypes2.default.object.isRequired
};
exports.default = ClearIndicator;