"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactOutsideClickHandler = require("react-outside-click-handler");

var _reactOutsideClickHandler2 = _interopRequireDefault(_reactOutsideClickHandler);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colorUtil = require("./colorUtil");

var _colorUtil2 = _interopRequireDefault(_colorUtil);

var _HexInput = require("./HexInput");

var _HexInput2 = _interopRequireDefault(_HexInput);

var _ColorOptions = require("./ColorOptions");

var _ColorOptions2 = _interopRequireDefault(_ColorOptions);

require("./color-picker.global.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ColorPicker Component
 */
var ColorPicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ColorPicker, _React$Component);

  function ColorPicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      showOptions: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleColorChange", function (color) {
      var onChange = _this.props.onChange;
      onChange && onChange({
        rgba: color.rgb || color.rgba,
        hsva: color.hsv || color.hsva,
        hex: color.hex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOutsideClick", function () {
      _this.setState({
        showOptions: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleShowOptions", function () {
      _this.setState({
        showOptions: !_this.state.showOptions
      });
    });

    return _this;
  }

  var _proto = ColorPicker.prototype;

  _proto.validColor = function validColor() {
    var _this$props$color = this.props.color,
        rgba = _this$props$color.rgba,
        hsva = _this$props$color.hsva,
        hex = _this$props$color.hex;
    var color = rgba || hsva || hex;

    var hsvaAux = color && (hsva || _colorUtil2.default.any.to.hsv(color));

    var hexAux = color && (hex || _colorUtil2.default.any.to.hex(color));

    var rgbaAux = color && (rgba || _colorUtil2.default.any.to.rgb(color));

    return {
      rgba: rgbaAux,
      hsva: hsvaAux,
      hex: hexAux
    };
  };

  _proto.render = function render() {
    var _this$props = this.props,
        title = _this$props.title,
        disabled = _this$props.disabled;

    var _this$validColor = this.validColor(),
        rgba = _this$validColor.rgba,
        hsva = _this$validColor.hsva,
        hex = _this$validColor.hex;

    var styleColorBox = {
      backgroundColor: "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")",
      height: '1.5rem'
    };
    return _react2.default.createElement(_reactOutsideClickHandler2.default, {
      onOutsideClick: this.handleOutsideClick
    }, _react2.default.createElement("div", {
      className: "relative dib w-100"
    }, title && _react2.default.createElement("div", {
      className: "bb b--muted-4 mb3 t-heading-5 pv5"
    }, title), _react2.default.createElement("div", {
      className: "flex w-100"
    }, _react2.default.createElement("div", {
      className: "w-25 pa1"
    }, _react2.default.createElement("div", {
      className: "t-small w-100 c-on-base db mb3"
    }, this.props.label), _react2.default.createElement("div", {
      className: "ba bw1 b--muted-4 br2 pa1 " + (disabled ? '' : 'hover-b--action-primary pointer'),
      onClick: this.handleShowOptions
    }, _react2.default.createElement("div", {
      className: "br1",
      style: styleColorBox
    }))), _react2.default.createElement("div", {
      className: "w-75 pa1"
    }, _react2.default.createElement(_HexInput2.default, {
      rgb: rgba,
      onChange: this.handleColorChange,
      disabled: disabled
    }))), _react2.default.createElement("div", null, this.state.showOptions && !disabled && _react2.default.createElement(_ColorOptions2.default, _extends({}, this.props, {
      color: {
        rgba: rgba,
        hex: hex,
        hsva: hsva
      },
      onColorChange: this.handleColorChange
    })))));
  };

  return ColorPicker;
}(_react2.default.Component);
/** Default props values */


ColorPicker.defaultProps = {
  label: 'Default'
};
ColorPicker.propTypes = {
  /** onChange event */
  onChange: _propTypes2.default.func,

  /** Color Label */
  label: _propTypes2.default.string,

  /** ColorPicker Title */
  title: _propTypes2.default.string,

  /** Color format */
  color: _propTypes2.default.shape({
    /** RGBA color format */
    rgba: _propTypes2.default.object,

    /** HSVA color format */
    hsva: _propTypes2.default.object,

    /** HEX color format */
    hex: _propTypes2.default.string
  }).isRequired,

  /** Color history */
  colorHistory: _propTypes2.default.array.isRequired,

  /** Disable component */
  disabled: _propTypes2.default.bool
};
exports.default = ColorPicker;