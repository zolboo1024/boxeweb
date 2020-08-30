"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InputPassword = require("../InputPassword");

var _InputPassword2 = _interopRequireDefault(_InputPassword);

var _deprecated = require("../../modules/deprecated");

var _deprecated2 = _interopRequireDefault(_deprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _deprecated2.default)({
  useNewComponent: {
    old: 'PasswordInput',
    new: 'InputPassword'
  }
})(_InputPassword2.default);