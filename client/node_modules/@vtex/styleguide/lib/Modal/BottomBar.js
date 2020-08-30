"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _modal = require("./modal.css");

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BottomBar = function BottomBar(props) {
  var children = props.children,
      showTopShadow = props.showTopShadow,
      responsiveFullScreen = props.responsiveFullScreen,
      showBorder = props.showBorder;
  return _react2.default.createElement("div", {
    className: "\n        flex justify-content flex-row-reverse \n        " + (showBorder ? 'bt b--muted-4 ' : '') + "\n        " + (responsiveFullScreen ? 'ph7 pv5 ph8-ns pv6-ns ' : 'ph6 ph8-ns pv5 pv6-ns ') + "\n        " + _modal2.default.shadowTransition + "\n        " + (showTopShadow ? 'shadow-4 ' : '') + "\n      "
  }, children);
};

BottomBar.propTypes = {
  showTopShadow: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  responsiveFullScreen: _propTypes2.default.bool,
  showBorder: _propTypes2.default.bool
};
BottomBar.defaultProps = {
  showTopShadow: false,
  responsiveFullScreen: false
};
exports.default = BottomBar;