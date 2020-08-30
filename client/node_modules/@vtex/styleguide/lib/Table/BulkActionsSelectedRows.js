"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var BulkActionsSelectedRows =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(BulkActionsSelectedRows, _Component);

  function BulkActionsSelectedRows() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = BulkActionsSelectedRows.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    // This prevents the value from showing 0 when bar is closing
    // It reduces the "noise" given to the user from a ux point of view
    if (nextProps.selectedRowsLength === 0) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    return this.props.selectedRowsLength;
  };

  return BulkActionsSelectedRows;
}(_react.Component);

BulkActionsSelectedRows.propTypes = {
  selectedRowsLength: _propTypes2.default.number.isRequired
};
exports.default = BulkActionsSelectedRows;