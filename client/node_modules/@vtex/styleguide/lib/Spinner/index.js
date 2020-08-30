"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../icon/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var radius = 40;
var circ = 2 * radius * Math.PI;

var Spinner =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Spinner, _React$Component);

  function Spinner() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Spinner.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        size = _this$props.size,
        block = _this$props.block;
    return _react2.default.createElement("svg", {
      className: (0, _utils.baseClassname)('spinner') + " " + (!color ? 'c-action-primary' : '') + " " + (block ? 'db' : ''),
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      height: size,
      width: size
    }, _react2.default.createElement("style", null, "\n            @keyframes vtex-spinner-rotate {\n              from {\n                transform-origin: 50% 50%;\n                transform: rotate(0deg);\n              }\n              to {\n                transform-origin: 50% 50%;\n                transform: rotate(360deg);\n              }\n            }\n\n            @keyframes vtex-spinner-fill {\n              0% {\n                stroke-dasharray: 0 0 2 " + circ + ";\n              }\n              50% {\n                stroke-dasharray: 0 0 " + circ * 0.75 + " " + circ + ";\n              }\n              100% {\n                stroke-dasharray: 0 " + (circ - 2) + " " + circ * 0.75 + " " + circ + ";\n              }\n            }\n\n            .vtex-spinner_circle {\n              animation: vtex-spinner-fill 1.25s infinite cubic-bezier(0.455, 0.030, 0.515, 0.955), vtex-spinner-rotate 0.625s infinite linear;\n            }\n          "), _react2.default.createElement("circle", {
      className: "vtex-spinner_circle",
      cx: "50",
      cy: "50",
      fill: "none",
      r: radius,
      stroke: color || 'currentColor',
      strokeWidth: "10",
      strokeDasharray: "0 0 " + circ * 0.75 + " " + circ,
      strokeLinecap: "round",
      strokeDashoffset: "1"
    }));
  };

  return Spinner;
}(_react2.default.Component);

Spinner.propTypes = {
  /** Color of the spinner */
  color: _propTypes2.default.string,

  /** Size (diameter) of the spinner */
  size: _propTypes2.default.number,

  /** Sets the display to block */
  block: _propTypes2.default.bool
};
Spinner.defaultProps = {
  block: false,
  size: 40
};
exports.default = Spinner;