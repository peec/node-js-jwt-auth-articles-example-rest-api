'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
    (0, _article2.default)(router);
    (0, _user2.default)(router);
};
//# sourceMappingURL=index.js.map