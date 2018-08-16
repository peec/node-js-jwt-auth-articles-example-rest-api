'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.to = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var to = exports.to = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(promise) {
        var err, res, _ref2, _ref3;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        err = void 0, res = void 0;
                        _context.next = 3;
                        return (0, _awaitToJs.to)(promise);

                    case 3:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        err = _ref3[0];
                        res = _ref3[1];

                        if (!err) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt('return', [(0, _parseError2.default)(err)]);

                    case 9:
                        return _context.abrupt('return', [null, res]);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function to(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.responseError = responseError;
exports.responseSuccess = responseSuccess;
exports.throwError = throwError;

var _awaitToJs = require('await-to-js');

var _parseError = require('parse-error');

var _parseError2 = _interopRequireDefault(_parseError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function responseError(res, err, code) {
    // Error Web Response
    if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json({ success: false, error: err });
}

function responseSuccess(res, data, code) {
    // Success Web Response
    var send_data = { success: true };
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) == 'object') {
        send_data = Object.assign(data, send_data); //merge the objects
    }
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json(send_data);
}

function throwError(err_message, log) {
    // throwError stands for Throw Error
    if (log === true) {
        console.error(err_message);
    }
    throw new Error(err_message);
}
//# sourceMappingURL=util.service.js.map