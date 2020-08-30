"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePicker = require("../DatePicker");

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _Clock = require("../icon/Clock");

var _Clock2 = _interopRequireDefault(_Clock);

var _withForwardedRef = require("../../modules/withForwardedRef");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TimePicker(props) {
  return _react2.default.createElement(_DatePicker2.default, _extends({}, props, {
    ref: props.forwardedRef,
    timeIntervals: props.interval,
    prefix: _react2.default.createElement(_Clock2.default, null),
    useTimeOnly: true
  }));
}

TimePicker.propTypes = {
  /** @ignore Forwarded Ref */
  forwardedRef: _withForwardedRef.refShape,

  /** Popper alignment in relation to the input */
  align: _propTypes2.default.oneOf(['left', 'right']),

  /** Spec attribute  */
  autoFocus: _propTypes2.default.bool,

  /** Popper position in relation to the input */
  direction: _propTypes2.default.oneOf(['down', 'up']),

  /** Spec attribute  */
  disabled: _propTypes2.default.bool,

  /** Error highlight  */
  error: _propTypes2.default.bool,

  /** Error message  */
  errorMessage: _propTypes2.default.string,

  /** Times to be excluded  */
  excludeTimes: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),

  /** Help text  */
  helpText: _propTypes2.default.node,

  /** Spec attribute  */
  id: _propTypes2.default.string,

  /** Times to be included  */
  includeTimes: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),

  /** Interval between times */
  interval: _propTypes2.default.oneOf([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]),

  /** Label  */
  label: _propTypes2.default.string,

  /** Locale string ('en-US', 'pt-BR', ...)  */
  locale: _propTypes2.default.string.isRequired,

  /** Spec attribute  */
  name: _propTypes2.default.string,

  /** onChange event  */
  onChange: _propTypes2.default.func.isRequired,

  /** onFocus event  */
  onFocus: _propTypes2.default.func,

  /** onBlur event  */
  onBlur: _propTypes2.default.func,

  /** Placeholder text  */
  placeholder: _propTypes2.default.string,

  /** Spec attribute  */
  readOnly: _propTypes2.default.bool,

  /** Spec attribute  */
  required: _propTypes2.default.bool,

  /** TimePicker size  */
  size: _propTypes2.default.oneOf(['small', 'regular', 'large']),

  /** Spec attribute  */
  tabIndex: _propTypes2.default.string,

  /** Interval between times (in min)  */
  intervals: _propTypes2.default.number,

  /** Value of the selected time  */
  value: _propTypes2.default.instanceOf(Date).isRequired
};
exports.default = (0, _withForwardedRef.withForwardedRef)(TimePicker);