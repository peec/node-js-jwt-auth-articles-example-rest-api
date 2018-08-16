import mongoose from 'mongoose';

let ArticleSchema = new mongoose.Schema(
    {
        text: String,
        title: String,
        feature_img: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

ArticleSchema.methods.addAuthor = function (author_id) {
    this.author = author_id;
    return this.save()
};

ArticleSchema.methods.getUserArticle = function (_id) {
    Article.find({'author': _id}).then((article) => {
        return article
    })
};

ArticleSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};


export default mongoose.model('Article', ArticleSchema);
