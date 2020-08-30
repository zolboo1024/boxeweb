"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DropdownList =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(DropdownList, _PureComponent);

  function DropdownList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (index) {
      _this.props.onSelect && _this.props.onSelect(index);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (index) {
      _this.props.onFocus && _this.props.onFocus(index);
    });

    return _this;
  }

  var _proto = DropdownList.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        emptyState = _this$props.emptyState,
        focused = _this$props.focused,
        formatOption = _this$props.formatOption,
        isVisible = _this$props.isVisible,
        loading = _this$props.loading,
        loadingText = _this$props.loadingText,
        _onMouseEnter = _this$props.onMouseEnter,
        _onMouseLeave = _this$props.onMouseLeave,
        options = _this$props.options;
    if (!isVisible) return null;
    var optionList = options.map(function (opt, index) {
      var focusedClasses = index === focused ? ' bg-muted-5 c-on-muted-5 ' : ' bg-base c-on-base ';
      return _react2.default.createElement("li", {
        className: "pv4 ph5 pointer t-small fw3 c-on-muted-4 " + focusedClasses,
        dangerouslySetInnerHTML: {
          __html: formatOption(opt)
        },
        key: index,
        onClick: function onClick() {
          return _this2.handleSelect(index);
        },
        onMouseEnter: function onMouseEnter() {
          return _this2.handleFocus(index);
        }
      });
    });
    var results = options.length === 0 ? _react2.default.createElement("div", {
      className: "pv4 ph5 t-small c-muted-2 bg-base",
      dangerouslySetInnerHTML: {
        __html: emptyState
      }
    }) : _react2.default.createElement("ul", {
      className: "ph0 mv0 list"
    }, optionList);
    return _react2.default.createElement("div", {
      className: "b--muted-4 br--bottom br2 b--solid bw1 absolute w-100 z-max",
      style: {
        borderTop: 'none',
        boxShadow: '0 1px 18px rgba(0,0,0,0.15)'
      },
      onMouseEnter: function onMouseEnter() {
        return _onMouseEnter && _onMouseEnter();
      },
      onMouseLeave: function onMouseLeave() {
        return _onMouseLeave && _onMouseLeave();
      }
    }, loading && _react2.default.createElement("div", {
      className: "pv4 ph5 t-small c-muted-2 bg-base"
    }, loadingText), !loading && results);
  };

  return DropdownList;
}(_react.PureComponent);

exports.default = DropdownList;
DropdownList.defaultProps = {
  focused: '',
  formatOption: function formatOption(opt) {
    return opt.label;
  },
  loading: false,
  loadingText: 'Loading...',
  options: [],
  isVisible: false
};
DropdownList.propTypes = {
  emptyState: _propTypes2.default.string,
  focused: _propTypes2.default.number,
  formatOption: _propTypes2.default.func,
  loading: _propTypes2.default.bool,
  loadingText: _propTypes2.default.string,
  onSelect: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  options: _propTypes2.default.array,
  isVisible: _propTypes2.default.bool
};