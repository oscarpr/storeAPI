var enviroment = require('./../enviroment'),
    auth = require('basic-auth');

const validUserName = 'my_user';
const validPass = 'my_password';

module.exports = function (req) {
    var credentials = auth(req);

    return credentials.name === validUserName && credentials.pass === validPass;
}