'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _bcryptPromise = require('bcrypt-promise');

var _bcryptPromise2 = _interopRequireDefault(_bcryptPromise);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('./../services/util.service');

var _mongooseValidator = require('mongoose-validator');

var _mongooseValidator2 = _interopRequireDefault(_mongooseValidator);

var _config = require('./../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var UserSchema = _mongoose2.default.Schema({
    first: { type: String },
    last: { type: String },
    phone: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true, //sparse is because now we have two possible unique keys that are optional
        validate: [(0, _mongooseValidator2.default)({
            validator: 'isNumeric',
            arguments: [7, 20],
            message: 'Not a valid phone number.'
        })]
    },
    email: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
        validate: [(0, _mongooseValidator2.default)({
            validator: 'isEmail',
            message: 'Not a valid email.'
        })]
    },
    // select=false, do not select the password by default.
    password: { type: String, select: false }

}, { timestamps: true });

UserSchema.pre('save', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
        var err, salt, hash, _ref2, _ref3, _ref4, _ref5;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(this.isModified('password') || this.isNew)) {
                            _context.next = 19;
                            break;
                        }

                        err = void 0, salt = void 0, hash = void 0;
                        _context.next = 4;
                        return (0, _util.to)(_bcrypt2.default.genSalt(10));

                    case 4:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        err = _ref3[0];
                        salt = _ref3[1];

                        if (err) (0, _util.throwError)(err.message, true);

                        _context.next = 11;
                        return (0, _util.to)(_bcrypt2.default.hash(this.password, salt));

                    case 11:
                        _ref4 = _context.sent;
                        _ref5 = _slicedToArray(_ref4, 2);
                        err = _ref5[0];
                        hash = _ref5[1];

                        if (err) (0, _util.throwError)(err.message, true);

                        this.password = hash;

                        _context.next = 20;
                        break;

                    case 19:
                        return _context.abrupt('return', next());

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

UserSchema.methods.comparePassword = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pw) {
        var err, pass, _ref7, _ref8;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        err = void 0, pass = void 0;

                        if (!this.password) (0, _util.throwError)('password not set');

                        _context2.next = 4;
                        return (0, _util.to)(_bcryptPromise2.default.compare(pw, this.password));

                    case 4:
                        _ref7 = _context2.sent;
                        _ref8 = _slicedToArray(_ref7, 2);
                        err = _ref8[0];
                        pass = _ref8[1];

                        if (err) (0, _util.throwError)(err);

                        if (!pass) (0, _util.throwError)('invalid password');

                        return _context2.abrupt('return', this);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x2) {
        return _ref6.apply(this, arguments);
    };
}();

UserSchema.virtual('full_name').set(function (name) {
    var split = name.split(' ');
    this.first = split[0];
    this.last = split[1];
});

UserSchema.virtual('full_name').get(function () {
    //now you can treat as if this was a property instead of a function
    if (!this.first) return null;
    if (!this.last) return this.first;

    return this.first + ' ' + this.last;
});

UserSchema.methods.getJWT = function () {
    var expiration_time = parseInt(_config2.default.jwt_expiration);
    return "Bearer " + _jsonwebtoken2.default.sign({ user_id: this._id }, _config2.default.jwt_encryption, { expiresIn: expiration_time });
};
UserSchema.methods.toWeb = function () {
    var json = this.toJSON();
    json.id = this._id; //this is for the front end
    delete json.password;
    return json;
};

exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map