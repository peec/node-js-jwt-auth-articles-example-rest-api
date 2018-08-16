import User from './../models/User';
import fs from 'fs';
import {to, responseError, responseSuccess} from './../services/util.service';
import {createUser, authUser} from './../services/auth.service';

const UserCtrl = {
    create: async (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        const body = req.body;
        if (!body.unique_key && !body.email && !body.phone) {
            return responseError(res, 'Please enter an email or phone number to register.');
        } else if (!body.password) {
            return responseError(res, 'Please enter a password to register.');
        } else {
            let err, user;

            [err, user] = await to(createUser(body));

            if (err) return responseError(res, err, 422);
            return responseSuccess(res, {
                message: 'Successfully created new user.',
                user: user.toWeb(),
                token: user.getJWT()
            }, 201);
        }
    },

    login: async (req, res) => {
        const body = req.body;
        let err, user;

        [err, user] = await to(authUser(req.body));
        if (err) responseError(res, err, 422);

        return responseSuccess(res, {
            token: user.getJWT(),
            user: user.toWeb()
        });
    }
};

export default UserCtrl;
