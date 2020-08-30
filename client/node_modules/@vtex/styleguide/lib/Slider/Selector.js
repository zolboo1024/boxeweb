"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Selector;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Selector(_ref) {
  var onDragStart = _ref.onDragStart,
      position = _ref.position,
      active = _ref.active,
      disabled = _ref.disabled,
      value = _ref.value,
      displayPopup = _ref.displayPopup,
      formatValue = _ref.formatValue,
      offset = _ref.offset,
      icon = _ref.icon;
  var containerClasses = (0, _classnames2.default)('vtex-slider__selector-container absolute pointer', {
    'z-2': active,
    'z-1': !active,
    'left-0': position === 'left',
    'right-0': position === 'right'
  });
  var containerStyle = position === 'left' ? {
    transform: "translateX(" + offset + "px) translateX(-50%)"
  } : {
    transform: "translateX(-" + offset + "px) translateX(50%)"
  };
  var dragCircleClasses = (0, _classnames2.default)('vtex-slider__selector br-100 bg-action-primary flex justify-center items-center', {
    'bg-action-primary': active && !disabled
  });
  var popupClasses = (0, _classnames2.default)('vtex-slider__selector-tooltip flex justify-center items-center relative ph3 pv2 br2 t-small ba', {
    'vtex-slider__tooltip--active bg-action-primary white b--action-primary': active,
    'bg-base b--muted-2 c-muted-1': !active
  });
  return _react2.default.createElement("div", {
    className: containerClasses,
    onMouseDown: onDragStart(position),
    onTouchStart: onDragStart(position),
    style: _extends({}, containerStyle, {
      willChange: 'transform',
      top: 6.5
    })
  }, (active || displayPopup) && _react2.default.createElement("div", {
    className: "absolute pb4",
    style: {
      left: '50%',
      bottom: '100%'
    }
  }, _react2.default.createElement("div", {
    className: popupClasses,
    style: {
      left: '-50%'
    }
  }, formatValue(value))), _react2.default.createElement("div", {
    className: dragCircleClasses,
    style: {
      height: '0.75rem',
      width: '0.75rem',
      boxShadow: '-1px 1px 3px rgba(0, 0, 0, 0.15)'
    }
  }, icon));
}

Selector.defaultProps = {
  active: false,
  disabled: false,
  value: 0,
  className: '',
  displayPopup: false,
  icon: null
};
Selector.propTypes = {
  /** Position of the selector */
  position: _propTypes2.default.oneOf(['left', 'right']).isRequired,

  /** onDragStart event */
  onDragStart: _propTypes2.default.func.isRequired,

  /** If the selector is active */
  active: _propTypes2.default.bool,

  /** If the selector is disabled */
  disabled: _propTypes2.default.bool,

  /** Current value of the selector */
  value: _propTypes2.default.number,

  /** Whether the popup is displayed when inactive */
  displayPopup: _propTypes2.default.bool,

  /** Function to format the value */
  formatValue: _propTypes2.default.func.isRequired,

  /** Margin offset value */
  offset: _propTypes2.default.number.isRequired,

  /** Icon to show inside the handle */
  icon: _propTypes2.default.node
};