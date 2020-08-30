"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _head = require("lodash/head");

var _head2 = _interopRequireDefault(_head);

var _FilterColapsible = require("./FilterColapsible");

var _FilterColapsible2 = _interopRequireDefault(_FilterColapsible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FilterOptions =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FilterOptions, _PureComponent);

  function FilterOptions() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleStatementChange", function (statement) {
      var statements = _this.props.statements;
      var subject = statement.subject;
      var filteredStatements = statements.filter(function (st) {
        return st.subject !== subject;
      });

      _this.props.onChangeStatements([].concat(filteredStatements, [statement]));
    });

    _defineProperty(_assertThisInitialized(_this), "extractStatement", function (statements, subject) {
      return (0, _find2.default)(statements, function (st) {
        return st.subject === subject;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createEmptyStatement", function (subject, options) {
      var availableVerbs = options && options[subject] ? options[subject].verbs : [];
      var verb = (0, _head2.default)(availableVerbs) ? (0, _head2.default)(availableVerbs).value : null;
      return {
        subject: subject,
        verb: verb,
        object: null,
        error: null
      };
    });

    return _this;
  }

  var _proto = FilterOptions.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        options = _this$props.options,
        statements = _this$props.statements;
    var optionsKeys = Object.keys(options);
    return optionsKeys.length > 0 && _react2.default.createElement("div", {
      className: 'flex flex-column'
    }, optionsKeys.map(function (subject) {
      var statement = _this2.extractStatement(statements, subject) || _this2.createEmptyStatement(subject, options);

      return _react2.default.createElement("div", {
        key: subject,
        className: "ma2"
      }, _react2.default.createElement(_FilterColapsible2.default, {
        subject: subject,
        options: options,
        statement: statement,
        onChangeStatement: _this2.handleStatementChange,
        beginWithOpenCollapsibles: optionsKeys.length <= 3
      }));
    }));
  };

  return FilterOptions;
}(_react.PureComponent);

FilterOptions.defaultProps = {
  options: []
};
FilterOptions.propTypes = {
  /** filter options (mirroring statements from Conditions component) */
  options: _propTypes2.default.objectOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    verbs: _propTypes2.default.array.isRequired
  })).isRequired,

  /** filter statements (mirroring statements from Conditions component) */
  statements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    subject: _propTypes2.default.string,
    verb: _propTypes2.default.string.isRequired,
    object: _propTypes2.default.any,
    error: _propTypes2.default.any
  })),

  /** Filters change callback: returns array of statement definitions */
  onChangeStatements: _propTypes2.default.func.isRequired
};
exports.default = FilterOptions;