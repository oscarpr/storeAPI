module.exports = function (app, appEnv) {

    require('./articles')(app, appEnv);
    require('./stores')(app, appEnv);
    require('./main')(app, appEnv);
}


