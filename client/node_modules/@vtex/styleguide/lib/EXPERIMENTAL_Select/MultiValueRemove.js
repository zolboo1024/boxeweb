"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _Close = require("../icon/Close");

var _Close2 = _interopRequireDefault(_Close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var MultiValueRemove = function MultiValueRemove(props) {
  var multiValueProps = _extends({}, props, {
    innerProps: _extends({}, props.innerProps, {
      className: "" + props.innerProps.className
    })
  });

  var _props$innerProps = props.innerProps,
      handleClick = _props$innerProps.onClick,
      handleTouchEnd = _props$innerProps.onTouchEnd,
      handleMouseDown = _props$innerProps.onMouseDown;
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement("div", {
    className: "flex items-center",
    onClick: handleClick,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown
  }, _react2.default.createElement(_reactSelect.components.MultiValueRemove, multiValueProps, _react2.default.createElement(_Close2.default, {
    size: 14
  }))));
};

MultiValueRemove.propTypes = {
  innerProps: _propTypes2.default.object
};
exports.default = MultiValueRemove;