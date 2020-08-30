"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _every = require("lodash/every");

var _every2 = _interopRequireDefault(_every);

var _Checkbox = require("../Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxGroup =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "isPartiallyChecked", function () {
      var checkedMap = _this.props.checkedMap;
      var checkedValues = Object.values(checkedMap).map(function (value) {
        return value.checked;
      });
      return (0, _some2.default)(checkedValues) && !(0, _every2.default)(checkedValues);
    });

    _defineProperty(_assertThisInitialized(_this), "isFullyChecked", function () {
      var checkedMap = _this.props.checkedMap;
      var checkedValues = Object.values(checkedMap).map(function (value) {
        return value.checked;
      });
      return (0, _every2.default)(checkedValues);
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnChange", function (key) {
      var _extends2;

      var checkedMap = _this.props.checkedMap;

      var newCheckedMap = _extends({}, checkedMap, (_extends2 = {}, _extends2[key] = _extends({}, checkedMap[key], {
        checked: !checkedMap[key].checked
      }), _extends2));

      _this.props.onGroupChange(newCheckedMap);
    });

    _defineProperty(_assertThisInitialized(_this), "setGroupChecked", function (value) {
      var checkedMap = _this.props.checkedMap;

      var newCheckedMap = _extends({}, checkedMap);

      Object.keys(checkedMap).forEach(function (key) {
        newCheckedMap[key].checked = value;
      });
      return newCheckedMap;
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnGroupChange", function () {
      if (_this.isPartiallyChecked() || _this.isFullyChecked()) {
        _this.props.onGroupChange(_this.setGroupChecked(false));
      } else {
        _this.props.onGroupChange(_this.setGroupChecked(true));
      }
    });

    _this.state = {
      groupChecked: false
    };
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        checkedMap = _this$props.checkedMap,
        disabled = _this$props.disabled,
        name = _this$props.name,
        id = _this$props.id,
        value = _this$props.value,
        label = _this$props.label,
        padded = _this$props.padded;
    return _react2.default.createElement("div", null, _react2.default.createElement(_Checkbox2.default, {
      checked: this.isFullyChecked(),
      partial: this.isPartiallyChecked(),
      id: id,
      name: name,
      onChange: this.handleOnGroupChange,
      value: value,
      disabled: disabled,
      label: label
    }), _react2.default.createElement("div", {
      className: (padded ? 'ml7' : '') + " mv5"
    }, Object.keys(checkedMap).map(function (key) {
      return _react2.default.createElement("div", {
        key: key,
        className: "mv6"
      }, _react2.default.createElement(_Checkbox2.default, {
        checked: checkedMap[key].checked,
        id: id + "-" + key,
        name: name,
        onChange: function onChange() {
          return _this2.handleOnChange(key);
        },
        value: value + "-" + key,
        disabled: disabled,
        label: checkedMap[key].label
      }));
    })));
  };

  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.defaultProps = {
  disabled: false,
  padded: true
};
CheckboxGroup.propTypes = {
  /** Map of objects containing the label and the checked value of each checkbox of this group */
  checkedMap: _propTypes2.default.objectOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    checked: _propTypes2.default.bool.isRequired
  })),

  /** (Input spec attribute) */
  disabled: _propTypes2.default.bool,

  /** (Input spec attribute) */
  id: _propTypes2.default.string.isRequired,

  /** Checkbox Group label (i.e. main checkbox label)*/
  label: _propTypes2.default.string,

  /** (Input spec attribute) */
  name: _propTypes2.default.string.isRequired,

  /** onChange event for the checkedMap object */
  onGroupChange: _propTypes2.default.func.isRequired,

  /** (Input spec attribute) */
  value: _propTypes2.default.string.isRequired,

  /** Setting for the padding, set it for false if want the inner checkboxes with no padding in relation to the main checkbox */
  padded: _propTypes2.default.bool
};
exports.default = CheckboxGroup;