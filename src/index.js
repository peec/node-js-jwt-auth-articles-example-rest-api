import "babel-polyfill"
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import setupRoutes from './routes';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import pe from 'parse-error';
import CONFIG from './config/config';
import passportMiddlware from './middleware/passport';

const app = express();
const router = express.Router();

mongoose.connect(CONFIG.database_url, {
    useNewUrlParser: true
}, (err,res) => {
    if (err) {
        console.error ('ERROR connecting to: ' + CONFIG.database_url + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + CONFIG.database_url);
    }
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(passport.initialize());
passportMiddlware(passport);


app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'views'))
    .set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

setupRoutes(router);
app.use('/api', router);

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

app.listen(CONFIG.port, () => console.log(`Listening on ${ CONFIG.port }`))
