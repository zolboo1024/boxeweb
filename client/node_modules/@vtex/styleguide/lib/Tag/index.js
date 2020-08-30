"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _config = require("vtex-tachyons/config.json");

var _config2 = _interopRequireDefault(_config);

var _Close = require("../icon/Close");

var _Close2 = _interopRequireDefault(_Close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tag =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tag, _PureComponent);

  function Tag() {
    var _this;

    _this = _PureComponent.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      _this.setState({
        hover: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      _this.setState({
        hover: false
      });
    });

    _this.state = {
      hover: false
    };
    return _this;
  }

  var _proto = Tag.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bgColor = _this$props.bgColor,
        children = _this$props.children,
        color = _this$props.color,
        disabled = _this$props.disabled,
        onClick = _this$props.onClick,
        size = _this$props.size,
        type = _this$props.type,
        variation = _this$props.variation;
    var sizeClasses = '';

    switch (size) {
      case 'small':
        sizeClasses = 't-mini pv2 ph4';
        break;

      case 'regular':
        sizeClasses = 't-small pv2 ph4';
        break;

      case 'large':
        sizeClasses = 't-body pv3 ph5';
        break;

      default:
        sizeClasses = 't-small pv2 ph4';
        break;
    }

    var baseClasses = "br-pill dib fw5 " + sizeClasses;
    var theme = '';
    var variationIsLow = variation === 'low';

    switch (type) {
      case 'success':
        theme = variationIsLow ? 'bg-transparent ba c-success ' : 'bg-success c-on-success ';
        break;

      case 'error':
        theme = variationIsLow ? 'bg-transparent ba c-danger ' : 'bg-danger c-on-danger ';
        break;

      case 'warning':
        theme = variationIsLow ? 'bg-transparent ba c-warning ' : 'bg-warning c-on-warning ';
        break;

      default:
        theme = variationIsLow ? 'bg-transparent ba c-muted-2 ' : 'bg-muted-2 c-on-muted-2 ';
        break;
    }

    var btnClasses = disabled ? 'bg-muted-4 c-muted-2 ' : 'pointer ';
    var hoverClass = '';

    if (!disabled) {
      hoverClass = this.state.hover && 'o-80';
    }

    return onClick ? _react2.default.createElement("button", {
      className: baseClasses + " bn " + btnClasses + " " + theme + " " + hoverClass,
      style: {
        backgroundColor: bgColor,
        color: disabled ? _config2.default.semanticColors.text.disabled : color
      },
      disabled: disabled,
      onClick: onClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, _react2.default.createElement("div", {
      className: "flex items-stretch"
    }, _react2.default.createElement("span", null, children), _react2.default.createElement("div", {
      className: "ml2 flex items-center"
    }, _react2.default.createElement(_Close2.default, {
      color: color,
      size: 12
    })))) : _react2.default.createElement("div", {
      className: baseClasses + " " + theme,
      style: {
        backgroundColor: bgColor,
        color: color
      }
    }, children);
  };

  return Tag;
}(_react.PureComponent);

Tag.defaultProps = {
  disabled: false,
  size: 'regular'
};
Tag.propTypes = {
  bgColor: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  color: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,

  /** Input size */
  size: _propTypes2.default.oneOf(['small', 'regular', 'large']),
  type: _propTypes2.default.oneOf(['success', 'error', 'warning']),
  variation: _propTypes2.default.oneOf(['default', 'low'])
};
exports.default = Tag;