"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Separator =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Separator, _React$Component);

  function Separator() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Separator.prototype;

  _proto.render = function render() {
    var label = this.props.label;
    return _react2.default.createElement("div", null, _react2.default.createElement("div", {
      style: {
        marginLeft: -17,
        width: 'calc(100% + 34px)'
      },
      className: "flex flex-row w-100 nowrap items-center mv3"
    }, _react2.default.createElement("hr", {
      className: "ma0 b--black-10 bb bb-0 w-100"
    })), _react2.default.createElement("div", {
      className: "w-100 tc",
      style: {
        marginTop: -18
      }
    }, _react2.default.createElement("span", {
      className: "gray ph3 dib bg-white"
    }, label)));
  };

  return Separator;
}(_react2.default.Component);

Separator.propTypes = {
  /** `and` or `or` label */
  label: _propTypes2.default.string
};
exports.default = Separator;