const { Sim, Addpg, Profile } = require('../models');
const fbAction = require('../boc_fb');

const getCrawPage = async (req, res) => {
    let result = await Addpg.find({});
    res.render('boc-page', {
      result
    })
};

const getCreatePage = (req, res) => {
res.render('view-add/add-page', {
    error: []
});
};

const postAddPage = async (req, res) => {
let name_page = await req.body.name_worker;
let link_page = await req.body.link;
let status = '0';
const result = await Addpg.create({
    name_page,
    link_page,
    status
});
if(result) {
    res.redirect('/admin/boc-page');
};

};

const getCrawDataPage = async (req, res) => {
let _id = await req.params.id;
const findPhone = await req.query.q;
let result = await Addpg.findOne({ _id });
let beforeStatus = result.status;
let status = await upStatus(beforeStatus);
let beforeLink = result.link_page;
// console.log(beforeLink)
if(findPhone) {
    var linkCraw = await fbAction.bocProfileFacebook(beforeLink);
    // console.log(linkCraw)
}
if(linkCraw) {
    var action = await Addpg.findByIdAndUpdate({ _id }, { $set: { status } });
};
res.render('view-profile/data-page', {
    linkCraw,
    findPhone,
    result
});
};

const crawPageDetail = async (req, res) => {
const link = await req.query.link;
const phoneFind = await req.query.phone;
const data = await fbAction.crawlink(link);
if(data) {
    console.log('content HTML');
};

const content = await fbAction.contentDetail(data);
// console.log(content);

const newcontent = await fbAction.originalContent(content);
if(content != []) {
    console.log('content')
};

const userCraw = await fbAction.crawlerUserDetail(content);
if(userCraw != []) {
    console.log('userCraw')
};

const listSim = await fbAction.crawlerPageDetail(content);
// console.log(listSim)
if(listSim != []) {
    console.log('data list sim');
};
// console.log(phoneFind);
if (phoneFind) {
    var find = await fbAction.findSim(listSim, phoneFind);
    console.log(find);

    if(find != []) {
    console.log('----------------')
    };
};
res.json({"user_info": newcontent, listSim, "findPhone": find, "dataProfile": userCraw });

};


module.exports = {
    getCrawPage,
    getCreatePage,
    postAddPage,
    getCrawDataPage,
    crawPageDetail
};