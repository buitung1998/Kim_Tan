const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
    user_id: String,
    ten_tho: String,
    link: String,
    status: Number,
    crawler_lastest: { type: Date, required: true, default: Date.now },
    created_at: { type: Date, default: () => new Date(), index: true }
    }
);

var Profile = module.exports = mongoose.model('profile', userSchema, 'profiles');
