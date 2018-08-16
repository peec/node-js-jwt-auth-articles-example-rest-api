import articleController from './../controllers/article.ctrl';
import passport from 'passport';

export default (router) => {
    router.post('/article', passport.authenticate('jwt', {session:false}), articleController.addArticle);
};
