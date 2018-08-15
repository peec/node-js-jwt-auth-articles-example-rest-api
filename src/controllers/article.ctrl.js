import Article from './../models/Article';
import User from './../models/User';
import fs from 'fs';
import cloudinary from 'cloudinary';

const ArticleCtrl = {
    async addArticle(req, res, next)
    {
        let { text, title, claps, description } = req.body;
        /*if (req.files) {
            cloudinary.uploader.upload(req.files.image.path,
                (result) => {

                }
            );
        }*/

        let obj = { text, title, claps, description, feature_img: '' };
        let article = new Article(obj);
        let newArticle = await article.save();

        res.send(newArticle);
        next();
    }
};

export default ArticleCtrl;
