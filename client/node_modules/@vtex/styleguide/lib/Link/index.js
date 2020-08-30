"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ExternalLink = require("../icon/ExternalLink");

var _ExternalLink2 = _interopRequireDefault(_ExternalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classes = 'pointer c-link hover-c-link active-c-link no-underline underline-hover';

var Link = function Link(_ref) {
  var children = _ref.children,
      href = _ref.href,
      target = _ref.target,
      mediumWeigth = _ref.mediumWeigth;
  return _react2.default.createElement("a", {
    href: href,
    target: target,
    className: classes + " " + (mediumWeigth ? 'fw5' : '')
  }, children, target === '_blank' && _react2.default.createElement("span", {
    className: "ml2"
  }, _react2.default.createElement(_ExternalLink2.default, {
    size: 12
  })));
};

Link.defaultProps = {
  target: '_self',
  mediumWeigth: false
};
Link.propTypes = {
  /** Content of the link */
  children: _propTypes2.default.string.isRequired,

  /** Spec attribute */
  href: _propTypes2.default.string.isRequired,

  /** Spec attribute */
  target: _propTypes2.default.oneOf(['_self', '_blank', '_parent', '_top']),

  /** Weight property */
  mediumWeigth: _propTypes2.default.bool
};
exports.default = Link;