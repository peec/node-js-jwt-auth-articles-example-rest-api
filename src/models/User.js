import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import bcrypt_p from 'bcrypt-promise';
import jwt from 'jsonwebtoken';
import {throwError, to} from './../services/util.service';
import validate from 'mongoose-validator';
import CONFIG from './../config/config';


let UserSchema = mongoose.Schema({
    first: {type: String},
    last: {type: String},
    phone: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,//sparse is because now we have two possible unique keys that are optional
        validate: [validate({
            validator: 'isNumeric',
            arguments: [7, 20],
            message: 'Not a valid phone number.',
        })]
    },
    email: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Not a valid email.',
        }),]
    },
    // select=false, do not select the password by default.
    password: {type: String, select: false},

}, {timestamps: true});

UserSchema.pre('save', async function(next){

    if(this.isModified('password') || this.isNew){

        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) throwError(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.password, salt));
        if(err) throwError(err.message, true);

        this.password = hash;

    } else{
        return next();
    }
});

UserSchema.methods.comparePassword = async function(pw) {
    let err, pass
    if (!this.password) throwError('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) throwError(err);

    if (!pass) throwError('invalid password');

    return this;
};


UserSchema.virtual('full_name').set(function (name) {
    var split = name.split(' ');
    this.first = split[0];
    this.last = split[1];
});

UserSchema.virtual('full_name').get(function () { //now you can treat as if this was a property instead of a function
    if(!this.first) return null;
    if(!this.last) return this.first;

    return this.first + ' ' + this.last;
});

UserSchema.methods.getJWT = function(){
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer "+jwt.sign({user_id:this._id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
};
UserSchema.methods.toWeb = function(){
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    delete json.password;
    return json;
};


export default mongoose.model('User', UserSchema);
