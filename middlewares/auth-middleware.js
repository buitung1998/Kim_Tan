const { Account } = require('../models/');

const requireAuth = async (req, res, next) => {
    const setCookie = await req.signedCookies.Admin;
    if(!setCookie) {
        res.redirect('/admin/login');
        return;
    }

    let user = await Account.findOne({ name: setCookie });

    if(!user) {
        res.redirect('/admin/login');
        return;
    }

    next();
};

module.exports = {
    requireAuth
};