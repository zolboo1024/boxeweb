"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require("../../Input");

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ObjectAtom =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ObjectAtom, _React$Component);

  function ObjectAtom() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ObjectAtom.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        options = _this$props.options,
        isFullWidth = _this$props.isFullWidth,
        statements = _this$props.statements,
        statementIndex = _this$props.statementIndex,
        onChangeObjectCallback = _this$props.onChangeObjectCallback;
    var condition = statements[statementIndex];
    var myChoice = options[condition.subject];

    if (!condition.verb) {
      return _react2.default.createElement(ObjectAtom.EmptyObjectAtom, null);
    }

    if (!myChoice) {
      return _react2.default.createElement(ObjectAtom.EmptyObjectAtom, null);
    }

    var currentVerb = myChoice.verbs.find(function (verb) {
      return verb.value === condition.verb;
    });

    if (!currentVerb) {
      return _react2.default.createElement(ObjectAtom.EmptyObjectAtom, null);
    }

    return _react2.default.createElement("div", {
      className: "mh3 flex-auto"
    }, currentVerb.object.renderFn({
      statementIndex: statementIndex,
      statements: statements,
      isFullWidth: isFullWidth,
      values: condition.object,
      error: null,
      extraParams: currentVerb.object.extraParams,
      onChangeObjectCallback: onChangeObjectCallback
    }));
  };

  return ObjectAtom;
}(_react2.default.Component);

_defineProperty(ObjectAtom, "EmptyObjectAtom", function () {
  return _react2.default.createElement("div", {
    className: "flex-auto"
  }, _react2.default.createElement("div", {
    className: "mh3 mb3"
  }, _react2.default.createElement(_Input2.default, {
    disabled: true
  })));
});

ObjectAtom.defaultProps = {
  onChangeStatement: function onChangeStatement() {},
  onChangeObjectCallback: function onChangeObjectCallback() {}
};
ObjectAtom.propTypes = {
  /** Current selected options for this Statement */
  statements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    subject: _propTypes2.default.string,
    verb: _propTypes2.default.string,
    object: _propTypes2.default.any,
    error: _propTypes2.default.string
  })),

  /** Possible options and respective data types, verb options */
  options: _propTypes2.default.object.isRequired,

  /** Stretch component to 100% of the width */
  isFullWidth: _propTypes2.default.bool,

  /** To which row does this Statement belong to?  */
  statementIndex: _propTypes2.default.number,

  /** Value changed callback */
  onChangeStatement: _propTypes2.default.func,

  /** Object Value changed callback */
  onChangeObjectCallback: _propTypes2.default.func
};
exports.default = ObjectAtom;