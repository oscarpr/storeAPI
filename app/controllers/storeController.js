'use strict';

var mongoose = require('mongoose'),
    Store = mongoose.model('Store'),
    ErrorMessage = require('./../models/response').error,
    SuccessMessage = require('./../models/response').succcess,
    enviroment = require('./../enviroment')

exports.save = function (req, res) {
    var newStore = new Store(req.body);
    newStore.save(function (err, store) {
        var response;
        if (err) {
            response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
            res.send(response);
        }

        response = new SuccessMessage();
        response._id = store._id;
        res.json(response);
    });
}


exports.lists_all = function (req, res) {

    Store.find({}, function (err, stores) {
        var response;
        if (err) {
            response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
            res.send(response);
        }

        response = new SuccessMessage(stores.length);
        response.stores = stores;
        res.json(response);
    });
}
