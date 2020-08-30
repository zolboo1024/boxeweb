"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactColor = require("react-color");

var _common = require("react-color/lib/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Gradient Component
 */
var Gradient =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Gradient, _React$Component);

  function Gradient() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Gradient.prototype;

  _proto.render = function render() {
    var _this = this;

    return _react2.default.createElement("div", {
      className: "gradient-container relative w-100 mv6"
    }, _react2.default.createElement(_common.Hue, _extends({}, this.props, {
      onChange: this.props.onChange,
      pointer: function pointer() {
        return _react2.default.createElement("div", {
          className: "pointer-gradient",
          style: {
            background: _this.props.hex
          }
        });
      },
      direction: "horizontal"
    })));
  };

  return Gradient;
}(_react2.default.Component);

Gradient.propTypes = {
  /** onChange event */
  onChange: _propTypes2.default.func,

  /** Pointer Hex Color */
  hex: _propTypes2.default.string
};
exports.default = (0, _reactColor.CustomPicker)(Gradient);