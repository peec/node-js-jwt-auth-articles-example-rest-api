import "babel-polyfill"
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';



const DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/nodejsgettingstarted"
const PORT = process.env.PORT || 5000;

const app = express();
const router = express.Router();

mongoose.connect(DATABASE_URL, {
    //useMongoClient: true
    useNewUrlParser: true
});

/** set up routes {API Endpoints} */
routes(router);


app.use(cors());
app.use(bodyParser.json());
app.use(helmet());


app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'views'))
    .set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.use('/api', router);


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
