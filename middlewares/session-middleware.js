const shortId = require('shortid');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        res.cookie('sessionId', shortId.generate())
    };  
    next();
};