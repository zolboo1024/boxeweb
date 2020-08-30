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

var Card =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Card, _PureComponent);

  function Card() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Card.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        noPadding = _this$props.noPadding;
    var padding = noPadding ? '' : 'pa6';
    return _react2.default.createElement("div", {
      style: {
        boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)'
      },
      className: "vtex-card card w-100 b2 br2 bg-base c-on-base " + padding
    }, children);
  };

  return Card;
}(_react.PureComponent);

Card.propTypes = {
  /** Content of the card */
  children: _propTypes2.default.node.isRequired,

  /** Use the full size of the card. */
  noPadding: _propTypes2.default.bool
};
exports.default = Card;