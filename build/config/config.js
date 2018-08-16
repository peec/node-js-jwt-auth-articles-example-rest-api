'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var CONFIG = {}; //Make this global to use all over the application

CONFIG.port = process.env.PORT || 5000;
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';
CONFIG.database_url = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost:27017/nodejsgettingstarted";

exports.default = CONFIG;
//# sourceMappingURL=config.js.map