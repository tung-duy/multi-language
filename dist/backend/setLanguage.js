"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(req, res, next) {
  const lng = req.headers['content-language'] || 'vi';
  req.i18n.changeLanguage(lng);
  return next();
}