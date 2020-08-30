"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

var _Plus = require("../icon/Plus");

var _Plus2 = _interopRequireDefault(_Plus);

var _Separator = require("./Separator");

var _Separator2 = _interopRequireDefault(_Separator);

var _StrategySelector = require("./StrategySelector");

var _StrategySelector2 = _interopRequireDefault(_StrategySelector);

var _Statement = require("./Statement");

var _Statement2 = _interopRequireDefault(_Statement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @visibleName Conditions
 */
var EXPERIMENTAL_Conditions =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(EXPERIMENTAL_Conditions, _React$Component);

  function EXPERIMENTAL_Conditions() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "objectIsEmpty", function (object) {
      if (object === undefined) return true;
      if (object === null) return true;
      if (object === '') return true;
      if (Array.isArray(object) && object.length === 0) return true;
      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "canAddNewCondition", function () {
      var statements = _this.props.statements;
      if (statements.length === 0) return true;
      var hasIncompleteCondition = statements.some(function (condition) {
        return condition.subject === '' || condition.verb === '' || _this.objectIsEmpty(condition.object);
      });
      return !hasIncompleteCondition;
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddNewCondition", function () {
      var emptyStatement = {
        subject: '',
        verb: '',
        object: null
      };

      _this.props.onChangeStatements([].concat(_this.props.statements, [emptyStatement]));
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveStatement", function (index) {
      var currentStatements = _this.props.statements;
      var updatedStatements = currentStatements.slice(0, index).concat(currentStatements.slice(index + 1));

      _this.props.onChangeStatements(updatedStatements);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeStatement", function (statementIndex, newValue, structure) {
      var updatedCurrentStatements = [].concat(_this.props.statements);

      if (structure === 'verb') {
        updatedCurrentStatements[statementIndex].object = null;
      }

      updatedCurrentStatements[statementIndex][structure] = newValue;

      _this.props.onChangeStatements(updatedCurrentStatements);
    });

    return _this;
  }

  var _proto = EXPERIMENTAL_Conditions.prototype;

  _proto.componentDidMount = function componentDidMount() {
    console.warn("Experimental component warning:\n\n       Conditions component is in an experimental state.\n       This component may suffer breaking changes in a near future, even in minor or patch versions.\n       It may even cease to exist without further notice \uD83D\uDC7B");
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        canDelete = _this$props.canDelete,
        statements = _this$props.statements,
        options = _this$props.options,
        subjectPlaceholder = _this$props.subjectPlaceholder,
        isFullWidth = _this$props.isFullWidth,
        isRtl = _this$props.isRtl,
        labels = _this$props.labels,
        showOperator = _this$props.showOperator,
        operator = _this$props.operator;
    return _react2.default.createElement("div", null, showOperator && _react2.default.createElement("div", {
      className: "mh6"
    }, _react2.default.createElement(_StrategySelector2.default, {
      operator: operator,
      labels: labels,
      onChangeOperator: function onChangeOperator(operator) {
        return _this2.props.onChangeOperator({
          operator: operator
        });
      }
    })), _react2.default.createElement("div", {
      className: "t-body c-on-base ph5 mt4 br3 b--muted-4 ba"
    }, this.props.statements.length === 0 ? _react2.default.createElement("div", {
      className: "mv6 mh3"
    }, _react2.default.createElement("span", {
      className: "light-gray"
    }, labels.noConditions)) : _react2.default.createElement("div", {
      className: "mv5"
    }, statements.map(function (statement, statementIndex) {
      return _react2.default.createElement("div", {
        className: "flex flex-column w-100 mv3",
        key: statementIndex
      }, _react2.default.createElement(_Statement2.default, {
        canDelete: canDelete,
        isRtl: isRtl,
        isFullWidth: isFullWidth,
        onChangeStatement: function onChangeStatement(newValue, structure) {
          _this2.handleChangeStatement(statementIndex, newValue, structure);
        },
        onRemoveStatement: function onRemoveStatement() {
          return _this2.handleRemoveStatement(statementIndex);
        },
        options: options,
        subjectPlaceholder: subjectPlaceholder,
        statements: statements,
        statementIndex: statementIndex,
        labels: labels
      }), statementIndex !== statements.length - 1 && _react2.default.createElement(_Separator2.default, {
        label: operator === 'all' ? labels.operatorAnd : labels.operatorOr
      }));
    })), _react2.default.createElement("div", {
      style: {
        marginLeft: -17,
        width: 'calc(100% + 34px)'
      },
      className: "flex flex-row w-100 nowrap items-center mv3"
    }, _react2.default.createElement("hr", {
      className: "ma0 b--black-10 bb bb-0 w-100"
    })), _react2.default.createElement("div", {
      style: {
        marginLeft: -10
      },
      className: "mv5"
    }, _react2.default.createElement(_Button2.default, {
      variation: "tertiary",
      size: "small",
      disabled: !this.canAddNewCondition(),
      onClick: this.handleAddNewCondition
    }, _react2.default.createElement("span", {
      className: "flex align-baseline"
    }, _react2.default.createElement("span", {
      className: "mr2"
    }, _react2.default.createElement(_Plus2.default, {
      solid: true,
      size: 16,
      color: "currentColor"
    })), labels.addNewCondition)))));
  };

  return EXPERIMENTAL_Conditions;
}(_react2.default.Component);

_defineProperty(EXPERIMENTAL_Conditions, "defaultProps", {
  operator: 'any',
  showOperator: true,
  statements: [],
  onChangeOperator: function onChangeOperator() {},
  onChangeStatements: function onChangeStatements() {},
  labels: {
    operatorAll: 'all',
    operatorAnd: 'and',
    operatorAny: 'any',
    operatorOr: 'or',
    headerPrefix: 'Matching',
    headerSufix: 'following conditions:',
    addConditionBtn: 'add condition',
    noConditions: 'No conditions selected.',
    addNewCondition: 'add new condition'
  }
});

EXPERIMENTAL_Conditions.propTypes = {
  /** Shows or hides the delete button */
  canDelete: _propTypes2.default.bool,

  /** Operator indicates whether all the statements should be met or any of them */
  operator: _propTypes2.default.oneOf(['all', 'any']),

  /** Current selected options for all statements */
  statements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    subject: _propTypes2.default.string,
    verb: _propTypes2.default.string,
    object: _propTypes2.default.any,
    error: _propTypes2.default.any
  })),

  /** Possible options and respective data types, verb options */
  options: _propTypes2.default.object.isRequired,

  /** Placeholder for subject dropdown */
  subjectPlaceholder: _propTypes2.default.string.isRequired,

  /** Wether to show this component stretched to the width */
  isFullWidth: _propTypes2.default.bool,

  /** Conditions change callback: array of statement definitions */
  onChangeStatements: _propTypes2.default.func,

  /** Operator (any, all) change callback  */
  onChangeOperator: _propTypes2.default.func,

  /** Whether the order of elements and text if right to left */
  isRtl: _propTypes2.default.bool,

  /** Show or hide the header that selects the operator (any vs all) */
  showOperator: _propTypes2.default.bool,

  /** Labels for the controls and texts, default is english */
  labels: _propTypes2.default.shape({
    addNewCondition: _propTypes2.default.string,
    addConditionBtn: _propTypes2.default.string,
    delete: _propTypes2.default.string,
    noConditions: _propTypes2.default.string,
    operatorAll: _propTypes2.default.string,
    operatorAnd: _propTypes2.default.string,
    operatorAny: _propTypes2.default.string,
    operatorOr: _propTypes2.default.string,
    headerPrefix: _propTypes2.default.string,
    headerSufix: _propTypes2.default.string
  })
};
exports.default = EXPERIMENTAL_Conditions;