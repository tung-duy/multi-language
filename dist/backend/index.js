"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _i18nextNodeFsBackend = _interopRequireDefault(require("i18next-node-fs-backend"));

var _path = require("path");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(app) {
  let rootPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _path.join)(process.cwd(), 'locales');
  const preload = (0, _fs.readdirSync)(rootPath, (err, data) => {
    if (err) throw err;
  });
  if (!(0, _fs.existsSync)(rootPath)) return console.log('The models storage directory does not exist');
  const ns = [];
  preload === null || preload === void 0 ? void 0 : preload.map(file => (0, _path.join)(rootPath, file)).forEach(path => {
    if ((0, _fs.readdirSync)(path).length) {
      (0, _fs.readdirSync)(path).map(file => {
        if (file.indexOf('.') !== 0 && file.slice(-5) === '.json') {
          const name = file.slice(0, -5);
          if (!ns.includes(name)) ns.push(name);
        }
      });
    }
  });

  _i18next.default.use(_i18nextExpressMiddleware.default.LanguageDetector).use(_i18nextNodeFsBackend.default).init({
    fallBackLng: ['en'],
    backend: {
      loadPath: (0, _path.join)(rootPath, '{{lng}}', '{{ns}}.json'),
      addPath: (0, _path.join)(rootPath, '{{lng}}', '{{ns}}.missing.json')
    },
    debug: false,
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie']
    },
    preload,
    ns,
    defaultNS: (ns === null || ns === void 0 ? void 0 : ns.length) ? ns[0] : null,
    saveMissing: true
  });

  app.use(_i18nextExpressMiddleware.default.handle(_i18next.default));
};

exports.default = _default;