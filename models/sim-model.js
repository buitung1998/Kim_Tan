const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var simsBoar = new mongoose.Schema({
    // _id: String,
    agency_id: String,
    url_fb: String,
    user_info: String,
    sim: { type: String, index: true },
    price: String,
    created_at: { type: Date, default: () => new Date(), index: true },
    updated_at: { type: Date },
    });

// const collectionName = getCollectionName('kho888');
// const model = mongoose.model(collectionName, sim);

var Sim = module.exports = mongoose.model('Sim', simsBoar, 'sims');


