"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function Tabs(_ref) {
  var children = _ref.children,
      fullWidth = _ref.fullWidth,
      sticky = _ref.sticky;
  var childrenArray = [].concat(children);
  var selectedTab = childrenArray.find(function (child) {
    return child.props.active;
  });
  var content = selectedTab && selectedTab.props.children;
  return _react2.default.createElement("div", {
    className: "vtex-tabs w-100 h-100 flex flex-column " + (sticky ? 'overflow-y-hidden' : '')
  }, _react2.default.createElement("div", {
    className: "vtex-tabs__nav flex flex-row bb b--muted-4"
  }, childrenArray.map(function (child, index) {
    return (0, _react.cloneElement)(child, {
      fullWidth: fullWidth,
      key: child.props.key != null ? child.props.key : index
    });
  })), _react2.default.createElement("div", {
    className: "vtex-tabs__content w-100 " + (sticky ? 'overflow-y-auto' : '')
  }, content));
};

Tabs.defaultProps = {
  fullWidth: false,
  sticky: false
};
Tabs.propTypes = {
  children: _propTypes2.default.arrayOf(_propTypes2.default.node),
  fullWidth: _propTypes2.default.bool,
  sticky: _propTypes2.default.bool
};
exports.default = Tabs;