"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNumberFormat = require("react-number-format");

var _reactNumberFormat2 = _interopRequireDefault(_reactNumberFormat);

var _Input = require("../Input");

var _Input2 = _interopRequireDefault(_Input);

var _withForwardedRef = require("../../modules/withForwardedRef");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** WORKAROUND incoming!
 * BaseInput is a wrapper for the Input component for being able to use the
 * prefix prop with the NumberFormat component.
 * We can remove this as soon as the following issue is resolved:
 * https://github.com/s-yadav/react-number-format/issues/276
 *
 */
var BaseInput = function BaseInput(props) {
  var prefix = props.inputPrefix,
      suffix = props.inputSuffix,
      ref = props.inputRef;
  return _react2.default.createElement(_Input2.default, _extends({}, props, {
    prefix: prefix,
    suffix: suffix,
    ref: ref
  }));
};

BaseInput.propTypes = {
  inputPrefix: _propTypes2.default.string,
  inputSuffix: _propTypes2.default.string,
  inputRef: _withForwardedRef.refShape
};
var baseNumber = 9999999999.9999999999;

var InputCurrency =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(InputCurrency, _Component);

  function InputCurrency() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (_ref) {
      var floatValue = _ref.floatValue;
      var onChange = _this.props.onChange;
      onChange && onChange(_extends({}, event, {
        target: _extends({}, event.target, {
          value: floatValue
        })
      }));
    });

    return _this;
  }

  var _proto = InputCurrency.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        locale = _this$props.locale,
        currencyCode = _this$props.currencyCode,
        forwardedRef = _this$props.forwardedRef,
        onChange = _this$props.onChange,
        props = _objectWithoutPropertiesLoose(_this$props, ["locale", "currencyCode", "forwardedRef", "onChange"]);

    var formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    });
    var formattedParts = formatter.formatToParts ? formatter.formatToParts(baseNumber) : null;
    var prefix = formattedParts ? !formattedParts.map(function (part) {
      return part.type;
    }).indexOf('currency') : true;

    var _ref2 = formattedParts ? formattedParts.filter(function (part) {
      return part.type === 'currency';
    }).map(function (part) {
      return part.value;
    }) : ['$'],
        currencySymbol = _ref2[0];

    var _ref3 = formattedParts ? formattedParts.filter(function (part) {
      return part.type === 'decimal';
    }).map(function (part) {
      return part.value;
    }) : ['.'],
        decimalSeparator = _ref3[0];

    var _ref4 = formattedParts ? formattedParts.filter(function (part) {
      return part.type === 'group';
    }).map(function (part) {
      return part.value;
    }) : [','],
        thousandSeparator = _ref4[0];

    var _ref5 = formattedParts ? formattedParts.filter(function (part) {
      return part.type === 'fraction';
    }).map(function (part) {
      return part.value;
    }) : ['99'],
        fraction = _ref5[0];

    return _react2.default.createElement("div", null, _react2.default.createElement(_reactNumberFormat2.default, _extends({}, props, {
      inputRef: forwardedRef,
      inputPrefix: prefix ? currencySymbol : null,
      inputSuffix: prefix ? null : currencySymbol,
      decimalSeparator: decimalSeparator || false,
      decimalScale: fraction ? fraction.length : 0,
      fixedDecimalScale: !!decimalSeparator,
      thousandSeparator: thousandSeparator,
      onValueChange: this.handleChange,
      customInput: BaseInput
    })));
  };

  return InputCurrency;
}(_react.Component);

InputCurrency.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: _withForwardedRef.refShape,

  /** _onChange event. You can get the numeric value of the input from the event
   * as _event.target.floatValue_ */
  onChange: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  size: _propTypes2.default.string,
  defaultValue: _propTypes2.default.number,
  value: _propTypes2.default.number,

  /** Locale ISO string ('en-US', 'pt-BR', etc.)*/
  locale: _propTypes2.default.string.isRequired,

  /** Currency code in ISO 4217 ('USD', 'BRL', etc.) */
  currencyCode: _propTypes2.default.string.isRequired
};
exports.default = (0, _withForwardedRef.withForwardedRef)(InputCurrency);