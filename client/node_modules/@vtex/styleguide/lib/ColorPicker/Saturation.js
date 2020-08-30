"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactColor = require("react-color");

var _propTypes = require("prop-types");

var _common = require("react-color/lib/components/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** SaturationCustom Component */
var SaturationCustom =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SaturationCustom, _React$Component);

  function SaturationCustom() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SaturationCustom.prototype;

  _proto.render = function render() {
    var hex = this.props.hex;
    return _react2.default.createElement("div", {
      className: "saturation-container relative w-100"
    }, _react2.default.createElement(_common.Saturation, _extends({}, this.props, {
      pointer: function pointer() {
        return _react2.default.createElement("div", {
          className: "pointer-saturation",
          style: {
            background: hex
          }
        });
      }
    })));
  };

  return SaturationCustom;
}(_react2.default.Component);

SaturationCustom.propTypes = {
  /** onChenge event */
  onChange: _propTypes.PropTypes.func,

  /** Pointer hex color  */
  hex: _propTypes.PropTypes.string
};
exports.default = (0, _reactColor.CustomPicker)(SaturationCustom);