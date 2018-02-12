'use strict';

var mongoose = require('mongoose');

module.exports = function (app, appEnv) {
    var routes = appEnv.routes;
    var article = require('./../controllers/articleController');

    routes.route('/articles')
        .post(article.save)
        .get(article.show);

    routes.route('/articles/:article_id')
        .delete(article.delete);

    routes.route('/articles/stores/:store_id')
        .get(article.show_article_stores);

}
