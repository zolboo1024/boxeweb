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

var _Close = require("../icon/Close");

var _Close2 = _interopRequireDefault(_Close);

var _SubjectAtom = require("./Atoms/SubjectAtom");

var _SubjectAtom2 = _interopRequireDefault(_SubjectAtom);

var _VerbAtom = require("./Atoms/VerbAtom");

var _VerbAtom2 = _interopRequireDefault(_VerbAtom);

var _ObjectAtom = require("./Atoms/ObjectAtom");

var _ObjectAtom2 = _interopRequireDefault(_ObjectAtom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Statement =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Statement, _React$Component);

  function Statement(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "handleChangeStatement", function (newValue, structure) {
      _this.props.onChangeStatement(newValue, structure);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveStatement", function () {
      _this.props.onRemoveStatement();
    });

    _defineProperty(_assertThisInitialized(_this), "getChoiceBySubject", function (subject) {
      var options = _this.props.options;
      return options[subject];
    });

    _defineProperty(_assertThisInitialized(_this), "resetPredicate", function (subjectValue) {
      var options = _this.props.options;

      _this.handleChangeStatement(options[subjectValue].verbs[0].value || Statement.defaultProps.statements[0].verb, 'verb');

      _this.handleChangeStatement(Statement.defaultProps.statements[0].object, 'object');

      _this.handleChangeStatement(null, 'error');
    });

    _defineProperty(_assertThisInitialized(_this), "clearObjects", function () {
      _this.handleChangeStatement(Statement.defaultProps.statements[0].object, 'object');

      _this.handleChangeStatement(null, 'error');
    });

    _this.handleChangeStatement({
      subject: _react2.default.createRef(),
      verb: _react2.default.createRef(),
      object: _react2.default.createRef()
    }, 'refs');

    return _this;
  }

  var _proto = Statement.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        canDelete = _this$props.canDelete,
        options = _this$props.options,
        subjectPlaceholder = _this$props.subjectPlaceholder,
        isRtl = _this$props.isRtl,
        isFullWidth = _this$props.isFullWidth,
        statements = _this$props.statements,
        statementIndex = _this$props.statementIndex,
        labels = _this$props.labels,
        onChangeObjectCallback = _this$props.onChangeObjectCallback;
    var condition = statements[statementIndex];
    var atomProps = {
      statements: statements,
      options: options,
      isFullWidth: isFullWidth,
      statementIndex: statementIndex,
      onChangeObjectCallback: onChangeObjectCallback
    };
    var statementAtoms = [_react2.default.createElement(_SubjectAtom2.default, _extends({
      ref: condition.refs.subject,
      key: "subject"
    }, atomProps, {
      placeholder: subjectPlaceholder,
      onChangeStatement: function onChangeStatement(value, structure) {
        _this2.handleChangeStatement(value, structure);

        _this2.resetPredicate(value);
      }
    })), _react2.default.createElement(_VerbAtom2.default, _extends({
      ref: condition.refs.verb,
      key: "verb"
    }, atomProps, {
      onChangeStatement: function onChangeStatement(value, structure) {
        _this2.handleChangeStatement(value, structure);
      }
    })), _react2.default.createElement(_ObjectAtom2.default, _extends({
      key: "object"
    }, atomProps))];
    return _react2.default.createElement("div", null, _react2.default.createElement("div", {
      className: "flex-column w-100 mv3"
    }, _react2.default.createElement("div", {
      className: "flex w-100 items-start " + (isFullWidth ? 'flex-column items-stretch' : '')
    }, canDelete && !isFullWidth && isRtl && _react2.default.createElement("div", {
      className: "ma3 c-muted-2 pointer hover-c-danger",
      onClick: this.handleRemoveStatement
    }, _react2.default.createElement(_Close2.default, {
      size: 25
    })), isRtl ? [].concat(statementAtoms).reverse() : statementAtoms, canDelete && !isFullWidth && !isRtl && _react2.default.createElement("div", {
      className: "ma3 c-muted-2 pointer hover-c-danger",
      onClick: this.handleRemoveStatement
    }, _react2.default.createElement(_Close2.default, {
      size: 25
    })), canDelete && isFullWidth && _react2.default.createElement("div", {
      className: "tr"
    }, _react2.default.createElement(_Button2.default, {
      variation: "tertiary",
      size: "small",
      onClick: this.handleRemoveStatement
    }, _react2.default.createElement("div", {
      className: "dib"
    }, _react2.default.createElement(_Close2.default, {
      className: "c-on-action-primary"
    })), _react2.default.createElement("div", {
      className: "dib mb1 v-mid",
      style: {
        lineHeight: '10px'
      }
    }, labels.delete)))), condition.error && condition.error.message && _react2.default.createElement("div", {
      className: "red t-small mh3 mt2 lh-title"
    }, condition.error.message)));
  };

  return Statement;
}(_react2.default.Component);

Statement.defaultProps = {
  onRemoveStatement: function onRemoveStatement() {},
  onChangeStatement: function onChangeStatement() {},
  onChangeObjectCallback: function onChangeObjectCallback() {},
  canDelete: true,
  statements: [{
    subject: '',
    verb: '',
    object: null
  }],
  isRtl: false,
  isFullWidth: false,
  statementIndex: 0,
  labels: {
    delete: 'DELETE'
  }
};
Statement.propTypes = {
  /** Shows or hides the delete button */
  canDelete: _propTypes2.default.bool,

  /** Current selected options for this Statement */
  statements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    refs: _propTypes2.default.shape({
      subject: _propTypes2.default.string,
      verb: _propTypes2.default.string,
      object: _propTypes2.default.any
    }),
    error: _propTypes2.default.string
  })),

  /** Possible options and respective data types, verb options */
  options: _propTypes2.default.object.isRequired,

  /** Placeholder for subject dropdown */
  subjectPlaceholder: _propTypes2.default.string.isRequired,

  /** Stretch component to 100% of the width */
  isFullWidth: _propTypes2.default.bool,

  /** Whether the order of elements and text if right to left */
  isRtl: _propTypes2.default.bool,

  /** Statement change callback */
  onChangeStatement: _propTypes2.default.func,

  /** Statement remove callback */
  onRemoveStatement: _propTypes2.default.func,

  /** To which row does this Statement belong to?  */
  statementIndex: _propTypes2.default.number,

  /** Labels for the controls and texts, default is english */
  labels: _propTypes2.default.shape({
    delete: _propTypes2.default.string
  }),

  /** Please use the following one with caution, I did not test it, so it can break everything */
  onChangeObjectCallback: _propTypes2.default.func
};
exports.default = Statement;