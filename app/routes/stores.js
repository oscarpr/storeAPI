'use strict';

var mongoose = require('mongoose');

module.exports = function (app, appEnv) {
    var routes = appEnv.routes;
    var store = require('./../controllers/storeController');

    routes.route('/stores')
        .post(store.save)
        .get(store.lists_all)
}
