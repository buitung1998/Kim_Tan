const { Sim, User, Account } = require('../models/');
const bcrypt = require('bcryptjs');

const getLogin = (req, res) => {
    var errors = [];
    res.render('auth/login', {
        errors
    })
};

// const getTest = async(req, res) => {
//     res.render('./test')
// };

// const test = async(req, res) => {
//     const name = await req.body.name
//     const pass = await req.body.pass
//     const password = await bcrypt.hash(pass, 5);
//     let result = await Account.create({
//         name,
//         password
//     })
//     if(result){
//         res.send('ok')
//     }
// };

const checkLogin = async(req, res) => {
    const name = await req.body.name;
    const password = await req.body.pass;
        var findName = await Account.findOne({ name });
        if (findName) {
            let result = await bcrypt.compare(password, findName.password);
            // console.log(result)
            if (result) {
                res.cookie('Admin', findName.name, {
                    signed: true
                });
                res.redirect('/admin/boc-sim');
            } else {
                res.render('auth/login', {
                    errors: ['wrong password !']
                })
            }
        } else {
          res.render('auth/login', {
            errors: ['No user name !']
            })
        };
};

module.exports = {
    getLogin,
    checkLogin,
    // test,
    // getTest
};