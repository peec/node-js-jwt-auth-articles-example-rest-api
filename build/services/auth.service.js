'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authUser = exports.createUser = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var createUser = exports.createUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userInfo) {
        var unique_key, auth_info, err, user, _ref2, _ref3, _ref4, _ref5;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        unique_key = void 0, auth_info = void 0, err = void 0, user = void 0;

                        auth_info = {};
                        auth_info.status = 'create';
                        unique_key = getUniqueKeyFromBody(userInfo);
                        if (!unique_key) (0, _util.throwError)('An email or phone number was not entered.');

                        if (!_validator2.default.isEmail(unique_key)) {
                            _context.next = 18;
                            break;
                        }

                        auth_info.method = 'email';
                        userInfo.email = unique_key;
                        _context.next = 10;
                        return (0, _util.to)(_User2.default.create(userInfo));

                    case 10:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        err = _ref3[0];
                        user = _ref3[1];

                        if (err) (0, _util.throwError)('user already exists with that email');
                        return _context.abrupt('return', user);

                    case 18:
                        if (!_validator2.default.isMobilePhone(unique_key, 'any')) {
                            _context.next = 31;
                            break;
                        }

                        auth_info.method = 'phone';
                        userInfo.phone = unique_key;
                        _context.next = 23;
                        return (0, _util.to)(_User2.default.create(userInfo));

                    case 23:
                        _ref4 = _context.sent;
                        _ref5 = _slicedToArray(_ref4, 2);
                        err = _ref5[0];
                        user = _ref5[1];

                        if (err) (0, _util.throwError)('user already exists with that phone number');
                        return _context.abrupt('return', user);

                    case 31:
                        (0, _util.throwError)('A valid email or phone number was not entered.');

                    case 32:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createUser(_x) {
        return _ref.apply(this, arguments);
    };
}();

var authUser = exports.authUser = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userInfo) {
        var unique_key, auth_info, user, err, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        //returns token
                        unique_key = void 0;
                        auth_info = {};
                        user = void 0, err = void 0;


                        auth_info.status = 'login';
                        unique_key = getUniqueKeyFromBody(userInfo);
                        if (!unique_key) (0, _util.throwError)('Please enter an email or phone number to login');

                        if (!userInfo.password) (0, _util.throwError)('Please enter a password to login');

                        if (!_validator2.default.isEmail(unique_key)) {
                            _context2.next = 18;
                            break;
                        }

                        auth_info.method = 'email';
                        // Note .select('+password') , see User model. Password is excluded by default!
                        _context2.next = 11;
                        return (0, _util.to)(_User2.default.findOne({ email: unique_key }).select('+password'));

                    case 11:
                        _ref7 = _context2.sent;
                        _ref8 = _slicedToArray(_ref7, 2);
                        err = _ref8[0];
                        user = _ref8[1];

                        if (err) (0, _util.throwError)(err.message);
                        _context2.next = 30;
                        break;

                    case 18:
                        if (!_validator2.default.isMobilePhone(unique_key, 'any')) {
                            _context2.next = 29;
                            break;
                        }

                        auth_info.method = 'phone';
                        _context2.next = 22;
                        return (0, _util.to)(_User2.default.findOne({ phone: unique_key }));

                    case 22:
                        _ref9 = _context2.sent;
                        _ref10 = _slicedToArray(_ref9, 2);
                        err = _ref10[0];
                        user = _ref10[1];

                        if (err) (0, _util.throwError)(err.message);
                        _context2.next = 30;
                        break;

                    case 29:
                        (0, _util.throwError)('A valid email or phone number was not entered');

                    case 30:
                        if (!user) (0, _util.throwError)('Not registered');
                        _context2.next = 33;
                        return (0, _util.to)(user.comparePassword(userInfo.password));

                    case 33:
                        _ref11 = _context2.sent;
                        _ref12 = _slicedToArray(_ref11, 2);
                        err = _ref12[0];
                        user = _ref12[1];

                        if (err) (0, _util.throwError)(err.message);
                        return _context2.abrupt('return', user);

                    case 39:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function authUser(_x2) {
        return _ref6.apply(this, arguments);
    };
}();

exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

var _User = require('./../models/User');

var _User2 = _interopRequireDefault(_User);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _util = require('./../services/util.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getUniqueKeyFromBody(body) {
    // this is so they can send in 3 options unique_key, email, or phone and it will work
    var unique_key = body.unique_key;
    if (typeof unique_key === 'undefined') {
        if (typeof body.email != 'undefined') {
            unique_key = body.email;
        } else if (typeof body.phone != 'undefined') {
            unique_key = body.phone;
        } else {
            unique_key = null;
        }
    }
    return unique_key;
}
//# sourceMappingURL=auth.service.js.map