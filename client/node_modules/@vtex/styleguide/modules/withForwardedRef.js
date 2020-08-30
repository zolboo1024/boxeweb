"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refShape = undefined;
exports.withForwardedRef = withForwardedRef;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// For more info see: https://stackoverflow.com/a/51127130/10725088
var Element = typeof window === 'undefined' || typeof window.Element === 'undefined' ? function () {} : window.Element;

var refShape = exports.refShape = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.shape({
  current: _propTypes2.default.instanceOf(Element)
})]);

function withForwardedRef(Component) {
  var ComponentWithRef = _react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(Component, _extends({}, props, {
      forwardedRef: ref
    }));
  });

  ComponentWithRef.displayName = Component.displayName || Component.name;
  return ComponentWithRef;
}