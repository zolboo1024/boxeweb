"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require("../Input");

var _Input2 = _interopRequireDefault(_Input);

var _VisibilityOn = require("../icon/VisibilityOn");

var _VisibilityOn2 = _interopRequireDefault(_VisibilityOn);

var _VisibilityOff = require("../icon/VisibilityOff");

var _VisibilityOff2 = _interopRequireDefault(_VisibilityOff);

var _withForwardedRef = require("../../modules/withForwardedRef");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputPassword =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(InputPassword, _Component);

  function InputPassword() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      showPassword: false
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function () {
      return _this.setState(function (state) {
        return {
          showPassword: !state.showPassword
        };
      });
    });

    return _this;
  }

  var _proto = InputPassword.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var iconSize = InputPassword.iconSizes[this.props.size] || InputPassword.iconSizes.default;
    return _react2.default.createElement(_Input2.default, _extends({}, this.props, {
      type: this.state.showPassword ? 'text' : 'password',
      token: true,
      spellCheck: "false",
      suffix: _react2.default.createElement("span", {
        className: "pointer pt2",
        onClick: function onClick() {
          return _this2.toggle();
        }
      }, this.state.showPassword ? _react2.default.createElement(_VisibilityOff2.default, {
        solid: true,
        size: iconSize
      }) : _react2.default.createElement(_VisibilityOn2.default, {
        solid: true,
        size: iconSize
      }))
    }));
  };

  return InputPassword;
}(_react.Component);

_defineProperty(InputPassword, "iconSizes", {
  small: 14,
  default: 16,
  large: 18,
  'x-large': 22
});

InputPassword.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: _withForwardedRef.refShape,
  onChange: _propTypes2.default.func,
  size: _propTypes2.default.string,
  value: _propTypes2.default.string
};
exports.default = (0, _withForwardedRef.withForwardedRef)(InputPassword);