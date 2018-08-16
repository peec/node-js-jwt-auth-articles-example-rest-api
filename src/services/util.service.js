import {to as awaitTo} from 'await-to-js';
import pe from 'parse-error';

export async function to (promise) {
    let err, res;
    [err, res] = await awaitTo(promise);
    if(err) return [pe(err)];
    return [null, res];
}

export function responseError (res, err, code) { // Error Web Response
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }
    if(typeof code !== 'undefined') res.statusCode = code;
    return res.json({success:false, error: err});
}


export function responseSuccess (res, data, code) { // Success Web Response
    let send_data = {success:true};
    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }
    if(typeof code !== 'undefined') res.statusCode = code;
    return res.json(send_data)
}


export function throwError (err_message, log) { // throwError stands for Throw Error
    if(log === true){
        console.error(err_message);
    }
    throw new Error(err_message);
}
