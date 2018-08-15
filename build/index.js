'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/nodejsgettingstarted";
var PORT = process.env.PORT || 5000;

var app = (0, _express2.default)();
var router = _express2.default.Router();

_mongoose2.default.connect(DATABASE_URL, {
    //useMongoClient: true
    useNewUrlParser: true
});

/** set up routes {API Endpoints} */
(0, _routes2.default)(router);

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use((0, _helmet2.default)());

app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
app.set('views', _path2.default.join(__dirname, '..', 'views')).set('view engine', 'ejs');

app.get('/', function (req, res) {
    return res.render('pages/index');
});
app.use('/api', router);

app.listen(PORT, function () {
    return console.log('Listening on ' + PORT);
});
//# sourceMappingURL=index.js.map