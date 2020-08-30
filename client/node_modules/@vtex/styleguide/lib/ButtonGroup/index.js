"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

var _ButtonWithIcon = require("../ButtonWithIcon");

var _ButtonWithIcon2 = _interopRequireDefault(_ButtonWithIcon);

var _ActionMenu = require("../ActionMenu");

var _ActionMenu2 = _interopRequireDefault(_ActionMenu);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ButtonGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ButtonGroup, _Component);

  function ButtonGroup() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.render = function render() {
    var buttons = this.props.buttons;
    return _react2.default.createElement("div", {
      className: "button_group flex flex-row"
    }, buttons.map(function (btn, i) {
      var TagName = btn.type;
      return i === 0 ? // First button
      _react2.default.createElement("span", {
        key: i,
        className: "mr1 isFirstOfGroup"
      }, _react2.default.createElement(TagName, _extends({}, btn.props, {
        isGrouped: true,
        isFirstOfGroup: true
      }))) : buttons.length - 1 === i ? // Last button
      _react2.default.createElement(TagName, _extends({
        key: i
      }, btn.props, {
        isGrouped: true,
        isLastOfGroup: true
      })) : // Others
      _react2.default.createElement("span", {
        key: i,
        className: "mr1"
      }, _react2.default.createElement(TagName, _extends({}, btn.props, {
        isGrouped: true
      })));
    }));
  };

  return ButtonGroup;
}(_react.Component);

ButtonGroup.defaultProps = {};
ButtonGroup.propTypes = {
  buttons: (0, _utils.childrenOf)(_Button2.default, _ButtonWithIcon2.default, _ActionMenu2.default)
};
exports.default = ButtonGroup;