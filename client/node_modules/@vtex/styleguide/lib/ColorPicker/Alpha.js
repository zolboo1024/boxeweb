"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactColor = require("react-color");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _common = require("react-color/lib/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * AlphaComponent to control alpha level
 */
var AlphaCustom =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AlphaCustom, _React$Component);

  function AlphaCustom() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = AlphaCustom.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rgb = _this$props.rgb,
        hsl = _this$props.hsl,
        hex = _this$props.hex,
        onChange = _this$props.onChange;
    return _react2.default.createElement("div", {
      className: "gradient-container relative w-100 mv6 alpha"
    }, _react2.default.createElement(_common.Alpha, {
      rgb: rgb,
      hsl: hsl,
      onChange: onChange,
      pointer: function pointer() {
        return _react2.default.createElement("div", {
          className: "pointer-gradient",
          style: {
            background: hex
          }
        });
      }
    }));
  };

  return AlphaCustom;
}(_react2.default.Component);

AlphaCustom.propTypes = {
  /** onChange event */
  onChange: _propTypes2.default.func.isRequired,

  /** Hex Color string */
  hex: _propTypes2.default.string.isRequired,

  /** RGB color object */
  rgb: _propTypes2.default.object.isRequired,

  /** HSL color object */
  hsl: _propTypes2.default.object.isRequired
};
exports.default = (0, _reactColor.CustomPicker)(AlphaCustom);