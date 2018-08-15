'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
    name: String,
    email: String,
    provider: String,
    provider_id: String,
    token: String,
    provider_pic: String
});

exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map