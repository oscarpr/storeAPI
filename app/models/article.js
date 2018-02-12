'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');


var ArticleSchema = new Schema({
    description: String,
    name: String,
    price: Number,
    total_in_shelf: Number,
    total_in_vault: Number,
    store: {
        type: Number,
        ref: 'Store'
    }
});

ArticleSchema.plugin(autoIncrement.plugin, 'Article');
module.exports = mongoose.model('Article', ArticleSchema);