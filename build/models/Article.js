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
    description: String,
    feature_img: String,
    claps: Number,
    author: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        author: {
            type: _mongoose2.default.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String
    }]
});

ArticleSchema.methods.clap = function () {
    this.claps++;
    return this.save();
};

ArticleSchema.methods.comment = function (c) {
    this.comments.push(c);
    return this.save();
};

ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id;
    return this.save();
};

ArticleSchema.methods.getUserArticle = function (_id) {
    Article.find({ 'author': _id }).then(function (article) {
        return article;
    });
};

exports.default = _mongoose2.default.model('Article', ArticleSchema);
//# sourceMappingURL=Article.js.map