import Article from './../models/Article';
import User from './../models/User';
import fs from 'fs';
import cloudinary from 'cloudinary';
import {responseSuccess} from "../services/util.service";

const ArticleCtrl = {
    async addArticle(req, res, next)
    {
        res.setHeader('Content-Type', 'application/json');
        let { text, title } = req.body;
        /*if (req.files) {
            cloudinary.uploader.upload(req.files.image.path,
                (result) => {

                }
            );
        }*/

        let obj = { text, title, feature_img: '' };
        let article = new Article(obj);
        article.author = req.user;
        let newArticle = await article.save();

        return responseSuccess(res, newArticle.toWeb());
    }
};

export default ArticleCtrl;
