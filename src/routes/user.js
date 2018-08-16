import UserController from './../controllers/user.ctrl';
import passport from 'passport';

export default (router) => {
    router.post('/users', UserController.create);
    router.post('/users/login',UserController.login);
};
