import articleController from './../controllers/article.ctrl';

export default (router) => {
    router.route('/article').post(articleController.addArticle);
};
