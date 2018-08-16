import User from './../models/User';
import validator from 'validator';
import { to, throwError } from './../services/util.service';

export function getUniqueKeyFromBody(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else if(typeof body.phone != 'undefined'){
            unique_key = body.phone
        }else{
            unique_key = null;
        }
    }
    return unique_key;
}

export async function createUser(userInfo){
    let unique_key, auth_info, err, user;
    auth_info={}
    auth_info.status='create';
    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) throwError('An email or phone number was not entered.');
    if(validator.isEmail(unique_key)){
        auth_info.method = 'email';
        userInfo.email = unique_key;
        [err, user] = await to(User.create(userInfo));
        if(err) throwError('user already exists with that email');
        return user;
    }else if(validator.isMobilePhone(unique_key, 'any')){
        auth_info.method = 'phone';
        userInfo.phone = unique_key;
        [err, user] = await to(User.create(userInfo));
        if(err) throwError('user already exists with that phone number');
        return user;
    }else{
        throwError('A valid email or phone number was not entered.');
    }
}


export async function authUser(userInfo){//returns token
    let unique_key;
    let auth_info = {};
    let user, err;

    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) throwError('Please enter an email or phone number to login');

    if(!userInfo.password) throwError('Please enter a password to login');
    if(validator.isEmail(unique_key)){
        auth_info.method='email';
        // Note .select('+password') , see User model. Password is excluded by default!
        [err, user] = await to(User.findOne({email:unique_key }).select('+password'));
        if(err) throwError(err.message);
    }else if(validator.isMobilePhone(unique_key, 'any')){
        auth_info.method='phone';
        [err, user] = await to(User.findOne({phone:unique_key }));
        if(err) throwError(err.message);
    }else{
        throwError('A valid email or phone number was not entered');
    }
    if(!user) throwError('Not registered');
    [err, user] = await to(user.comparePassword(userInfo.password));
    if(err) throwError(err.message);
    return user;
}