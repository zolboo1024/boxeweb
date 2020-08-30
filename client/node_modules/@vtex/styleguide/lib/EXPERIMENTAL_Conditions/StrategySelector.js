"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CaretDown = require("../icon/CaretDown");

var _CaretDown2 = _interopRequireDefault(_CaretDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var StrategySelector =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StrategySelector, _React$Component);

  function StrategySelector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleOperatorChange", function (event) {
      var newOperator = event.target.value;
      var operator = _this.props.operator;

      if (operator !== newOperator) {
        _this.props.onChangeOperator(newOperator);
      }
    });

    return _this;
  }

  var _proto = StrategySelector.prototype;

  _proto.render = function render() {
    var labels = this.props.labels;
    return _react2.default.createElement("div", {
      className: "flex flex-row nowrap"
    }, _react2.default.createElement("span", null, labels.headerPrefix), _react2.default.createElement("div", {
      className: "c-link relative"
    }, _react2.default.createElement("span", {
      className: "mh3 b"
    }, this.props.operator === 'all' ? labels.operatorAll : labels.operatorAny), _react2.default.createElement("select", {
      className: "o-0 absolute top-0 left-0 w-100 bottom-0 pointer t-small",
      onChange: this.handleOperatorChange,
      value: this.props.operator,
      style: {
        // safari select height fix
        WebkitAppearance: 'menulist-button'
      }
    }, _react2.default.createElement("option", {
      value: "all"
    }, labels.operatorAll), _react2.default.createElement("option", {
      value: "any"
    }, labels.operatorAny)), _react2.default.createElement(_CaretDown2.default, {
      size: 14
    })), _react2.default.createElement("span", {
      className: "ml3"
    }, labels.headerSufix));
  };

  return StrategySelector;
}(_react2.default.Component);

StrategySelector.propTypes = {
  /** Operator indicates whether all the conditions should be met or any of them */
  operator: _propTypes2.default.oneOf(['all', 'any']),

  /** Operator change callback: one of 'any', 'all' */
  onChangeOperator: _propTypes2.default.func,

  /** Labels for the controls and texts, default is english */
  labels: _propTypes2.default.shape({
    operatorAll: _propTypes2.default.string,
    operatorAny: _propTypes2.default.string,
    headerPrefix: _propTypes2.default.string,
    headerSufix: _propTypes2.default.string
  })
};
exports.default = StrategySelector;