'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Article = require('./../models/Article');

var _Article2 = _interopRequireDefault(_Article);

var _User = require('./../models/User');

var _User2 = _interopRequireDefault(_User);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _util = require('../services/util.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ArticleCtrl = {
    addArticle: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var _req$body, text, title, obj, article, newArticle;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            res.setHeader('Content-Type', 'application/json');
                            _req$body = req.body, text = _req$body.text, title = _req$body.title;
                            /*if (req.files) {
                                cloudinary.uploader.upload(req.files.image.path,
                                    (result) => {
                                     }
                                );
                            }*/

                            obj = { text: text, title: title, feature_img: '' };
                            article = new _Article2.default(obj);

                            article.author = req.user;
                            _context.next = 7;
                            return article.save();

                        case 7:
                            newArticle = _context.sent;
                            return _context.abrupt('return', (0, _util.responseSuccess)(res, newArticle.toWeb()));

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function addArticle(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        }

        return addArticle;
    }()
};

exports.default = ArticleCtrl;
//# sourceMappingURL=article.ctrl.js.map