'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./../controllers/user.ctrl');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
    router.post('/users', _user2.default.create);
    router.post('/users/login', _user2.default.login);
};
//# sourceMappingURL=user.js.map