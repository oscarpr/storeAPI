var express = require('express'),
    app = express(),
    autoIncrement = require('mongoose-auto-increment'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080,
    mongoURL = 'mongodb://admin:admin@node-store-rest-shard-00-00-ev4hi.mongodb.net:27017,node-store-rest-shard-00-01-ev4hi.mongodb.net:27017,node-store-rest-shard-00-02-ev4hi.mongodb.net:27017/test?ssl=true&replicaSet=node-store-rest-shard-0&authSource=admin',
    basicAuthMiddleware = require('./app/middlewares/basicAuth'),
    enviroment = require('./app/enviroment'),
    responses = require('./app/models/response');



mongoose.Promise = global.Promise;
mongoose.connect(`${mongoURL}`);
autoIncrement.initialize(mongoose.connection);


mongoose.connection.on('error', function (error) {
    console.log('error', error);
});
mongoose.connection.on('open', function () {
    console.log('conected to DB');
});

var stores = require('./app/models/store'),
    article = require('./app/models/article');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = express.Router();

const appEnv = {
    routes: routes
};

require('./app/routes')(app, appEnv);

app.use(function (req, res, next) {

    if (!basicAuthMiddleware(req)) {
        const code = enviroment.errors.auth.code;
        const msg = enviroment.errors.auth.msg;

        var response = new responses.error(code, msg);

        res.status(code).json(response);
        return;
    }
    next()

});


app.use('/server', routes);


app.listen(port);
console.log('API listening on port ' + port);

