import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String
    }
);

export default mongoose.model('User', UserSchema);
