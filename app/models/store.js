'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment')


var StoreSchema = new Schema({
    name: String,
    address: String
});

StoreSchema.plugin(autoIncrement.plugin, 'Store');
module.exports = mongoose.model('Store', StoreSchema);
