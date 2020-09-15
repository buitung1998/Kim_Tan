const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var accountSchema = new mongoose.Schema({
    // _id: String,
    name: String,
    password: String,
    created_at: { type: Date, default: () => new Date(), index: true },
    updated_at: { type: Date },
    }
);

 var Account = module.exports = mongoose.model('Account', accountSchema, 'accAdmin');
