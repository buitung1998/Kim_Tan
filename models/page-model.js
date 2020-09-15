const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
    name_page: { type: String, index: true },
    link_page: String,
    status: String,
    created_at: { type: Date, default: () => new Date(), index: true },
    updated_at: { type: Date },
    }
);

 var Addpg = module.exports = mongoose.model('Addpg', userSchema, 'page');

