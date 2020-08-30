"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Close = require("../icon/Close");

var _Close2 = _interopRequireDefault(_Close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tag =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tag, _Component);

  function Tag(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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
        children = _this$props.children,
        disabled = _this$props.disabled,
        _onClick = _this$props.onClick;
    var classes = disabled ? ' c-muted-2 bg-muted-4 ' : ' pointer bg-action-secondary c-on-action-secondary ';
    var hoverClass = '';

    if (!disabled) {
      hoverClass = this.state.hover ? 'c-danger' : 'c-on-action-secondary';
    }

    return _react2.default.createElement("button", {
      className: "br-pill bn dib t-small pv2 ph4 " + classes,
      disabled: disabled,
      onClick: function onClick() {
        _onClick && _onClick();
      },
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, _react2.default.createElement("div", {
      className: "flex items-center justify-center"
    }, _react2.default.createElement("span", {
      className: "self-center"
    }, children), ' ', _react2.default.createElement("div", {
      className: hoverClass + " ml2 pt2 self-center"
    }, _react2.default.createElement(_Close2.default, {
      color: "currentColor",
      size: 16
    }))));
  };

  return Tag;
}(_react.Component);

exports.default = Tag;
Tag.defaultProps = {
  disabled: false
};
Tag.propTypes = {
  children: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};