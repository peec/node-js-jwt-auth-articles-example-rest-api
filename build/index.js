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

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _parseError = require('parse-error');

var _parseError2 = _interopRequireDefault(_parseError);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _passport3 = require('./middleware/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

_mongoose2.default.connect(_config2.default.database_url, {
    useNewUrlParser: true
}, function (err, res) {
    if (err) {
        console.error('ERROR connecting to: ' + _config2.default.database_url + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + _config2.default.database_url);
    }
});

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _helmet2.default)());
app.use(_passport2.default.initialize());
(0, _passport4.default)(_passport2.default);

app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
app.set('views', _path2.default.join(__dirname, '..', 'views')).set('view engine', 'ejs');

app.get('/', function (req, res) {
    return res.render('pages/index');
});

(0, _routes2.default)(router);
app.use('/api', router);

process.on('unhandledRejection', function (error) {
    console.error('Uncaught Error', (0, _parseError2.default)(error));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

app.listen(_config2.default.port, function () {
    return console.log('Listening on ' + _config2.default.port);
});
//# sourceMappingURL=index.js.map