var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Store = mongoose.model('Store'),
    ErrorMessage = require('./../models/response').error,
    SuccessMessage = require('./../models/response').succcess,
    enviroment = require('./../enviroment');


exports.save = function (req, res) {
    var newArticle = new Article(req.body);

    newArticle.save(function (error, article) {
        try {
            var response;
            if (error) {
                response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
                res.send(response);
                return;
            }

            response = new SuccessMessage();
            response._id = article._id;
            res.json(response);
        } catch (error) {
            response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
            res.status(500).send(response);
        }

    });
}


exports.show = function (req, res) {
    Article.find({}).populate({ path: 'store', select: 'name' }).exec(function (err, articles) {
        try {
            if (err) {
                console.log(err);
                response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
                res.send(response);
                return;
            }

            response = new SuccessMessage(articles.length);
            response.articles = articles;

            res.json(response);
        } catch (error) {
            console.log(error);
            response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
            res.status(enviroment.errors.server.code).send(response);
        }

    });
}


exports.show_article_stores = function (req, res) {
    var response;
    const store_id = req.params.store_id;
    if (isNaN(store_id)) {
        const code = enviroment.errors.badRx.code;
        const message = enviroment.errors.badRx.msg;
        response = new ErrorMessage(code, message);
        res.status(code).send(response);
        return;
    }
    try {
        Store.findById(store_id, function (err, store) {
            if (store) {
                Article.find({ 'store': { $eq: store_id } }).populate({ path: 'store', select: 'name' }).exec(function (err, articles) {
                    if (err) {
                        console.log(err);
                        response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
                        res.status(enviroment.errors.server.code).send(response);
                        return;
                    }

                    response = new SuccessMessage(articles.length);
                    response.articles = articles;

                    res.json(response);
                });
            } else {
                const code = enviroment.errors.notfound.code;
                const msg = enviroment.errors.notfound.msg;
                resonse = new ErrorMessage(code, msg);
                res.status(code).json(resonse);
            }
        });
    } catch (error) {
        response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
        res.status(enviroment.errors.server.code).send(response);
    }
}


exports.delete = function (req, res) {
    Article.remove({ _id: req.params.article_id }, function (err) {
        try {
            if (err) {
                response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
                res.send(response);
                return;
            }

            response = new SuccessMessage();
            response._id = req.params.article_id;
            res.json(response);
        } catch (error) {
            response = new ErrorMessage(enviroment.errors.server.code, enviroment.errors.server.msg);
            res.status(500).send(response);
        }
    });
}