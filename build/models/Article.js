'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticleSchema = new _mongoose2.default.Schema({
    text: String,
    title: String,
    feature_img: String,
    author: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});

ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id;
    return this.save();
};

ArticleSchema.methods.getUserArticle = function (_id) {
    Article.find({ 'author': _id }).then(function (article) {
        return article;
    });
};

ArticleSchema.methods.toWeb = function () {
    var json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

exports.default = _mongoose2.default.model('Article', ArticleSchema);
//# sourceMappingURL=Article.js.map