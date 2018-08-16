import dotenv from 'dotenv';
dotenv.config();

let CONFIG = {} //Make this global to use all over the application

CONFIG.port = process.env.PORT || 5000;
CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';
CONFIG.database_url = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost:27017/nodejsgettingstarted";

export default CONFIG;
