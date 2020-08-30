"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var COMPLETED = 'completed';
var IN_PROGRESS = 'inProgress';
var TO_DO = 'toDo';

var Step =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Step, _PureComponent);

  function Step() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Step.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        type = _this$props.type,
        roundLeft = _this$props.roundLeft,
        roundRight = _this$props.roundRight,
        danger = _this$props.danger,
        slim = _this$props.slim;
    var halfOpacity = 'rgba(255, 255, 255, 0.5)';
    var fullOpacity = 'rgba(255, 255, 255, 0)';
    var gradientBackgroundStyle = {
      background: "repeating-linear-gradient(-45deg,  " + fullOpacity + ", " + fullOpacity + " 10px, " + halfOpacity + " 10px, " + halfOpacity + " 20px)"
    };
    var backgroundColorClass = danger ? 'bg-danger' : 'bg-action-primary';
    var roundLeftCSS = roundLeft ? _styles.roundedLeft : '';
    var roundRightCSS = roundRight ? _styles.roundedRight : '';
    var roundingStyle = roundLeft && roundRight ? 'br2' : roundRightCSS || roundLeftCSS;
    var paddingClass = slim ? 'pa1' : 'pa2';

    switch (type) {
      case IN_PROGRESS:
        return _react2.default.createElement("div", {
          className: "relative " + paddingClass + " " + backgroundColorClass + " overflow-hidden " + roundingStyle
        }, _react2.default.createElement("div", {
          style: gradientBackgroundStyle,
          className: _styles.scrollStep + " absolute top-0 bottom-0 right-0 left--2 pr2"
        }));

      case COMPLETED:
        return _react2.default.createElement("div", {
          className: roundingStyle + " " + paddingClass + " " + backgroundColorClass + " flex flex-row"
        });

      case TO_DO:
      default:
        return _react2.default.createElement("div", {
          className: roundingStyle + " " + paddingClass + " bg-muted-3 flex flex-row "
        });
    }
  };

  return Step;
}(_react.PureComponent);

Step.propTypes = {
  type: _propTypes2.default.oneOf([COMPLETED, IN_PROGRESS, TO_DO]).isRequired,
  roundLeft: _propTypes2.default.bool,
  roundRight: _propTypes2.default.bool,
  danger: _propTypes2.default.bool,
  slim: _propTypes2.default.bool
};
exports.default = Step;