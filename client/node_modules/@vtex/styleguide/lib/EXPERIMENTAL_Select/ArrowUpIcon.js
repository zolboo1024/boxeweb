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

var ArrowUpIcon =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ArrowUpIcon, _PureComponent);

  function ArrowUpIcon() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ArrowUpIcon.prototype;

  _proto.render = function render() {
    return _react2.default.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: this.props.size,
      height: this.props.size,
      viewBox: "0 0 24 24"
    }, _react2.default.createElement("g", {
      fill: this.props.color
    }, _react2.default.createElement("path", {
      d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z",
      transform: "translate(24 24) rotate(-180)"
    })));
  };

  return ArrowUpIcon;
}(_react.PureComponent);

ArrowUpIcon.defaultProps = {
  size: 16,
  color: 'currentColor'
};
ArrowUpIcon.propTypes = {
  size: _propTypes2.default.number.isRequired,
  color: _propTypes2.default.string.isRequired
};
exports.default = ArrowUpIcon;