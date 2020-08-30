"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Layout =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Layout, _Component);

  function Layout() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Layout.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        fullWidth = _this$props.fullWidth,
        pageHeader = _this$props.pageHeader,
        children = _this$props.children;
    return _react2.default.createElement("div", {
      className: "styleguide__layout flex justify-center pb7 bg-muted-5 min-vh-100"
    }, _react2.default.createElement("div", {
      className: fullWidth ? 'w-100' : 'w-100 mw8'
    }, pageHeader, _react2.default.createElement("div", {
      className: "layout__container ph7-ns"
    }, children)));
  };

  return Layout;
}(_react.Component);

Layout.defaultProps = {
  fullWidth: false
};
Layout.propTypes = {
  /** Content of the Layout */
  children: _propTypes2.default.node.isRequired,

  /** If the content fills the whole width */
  fullWidth: _propTypes2.default.bool,

  /** A PageHeader component slot */
  pageHeader: _propTypes2.default.node.isRequired
};
exports.default = Layout;