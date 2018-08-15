'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _article = require('./../controllers/article.ctrl');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
    router.route('/article').post(_article2.default.addArticle);
};
//# sourceMappingURL=article.js.map