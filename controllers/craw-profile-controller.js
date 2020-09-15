const { Sim, Addpg, Profile } = require('../models');
const fbAction = require('../boc_fb');

const getAddProfile = (req, res) => {
    res.render('view-add/add-profile', {
      error: []
    })
};

const postCreateProfile = async (req, res) => {

let result = await Profile.create({
    ten_tho: req.body.name_worker,
    link: req.body.link,
    status: req.body.status
});

if(result) {
    res.redirect('/admin/profile')
} else {
    console.log(error);
} 
};

const getProfile = async (req, res) => {
let profile = await Profile.find({});
res.render('show-profile', {
    profile
})
};

const getViewProfile = async (req, res) => {
let _id = await req.params.id;
let result = await Profile.find({ _id });
let beforeLink = result[0].link;
let link = await linkProfile(beforeLink);
let linkCraw = await bocProfileFacebook(link);
let beforeStatus = result[0].status;
let status = await upStatus(beforeStatus);

const action = await Profile.findByIdAndUpdate({ _id }, { $set: { status } });

res.render('view-profile/view-craw', {
    result,
    linkCraw  
});
};

const crawProfileDetail = async (req, res) => {
    const link = req.query.link;
    // console.log(link)
    const data = await crawlink(link);
    if(data !== []) {
        console.log('content HTML');
    };

    const content = await contentDetail(data);
    // console.log(content);

    const newcontent = await originalContent(content);
    if(content !== []) {
        console.log('content')
    };

    const listSim = await crawlerLinkDetail(content);
    if(listSim !== []) {
        console.log('listSim');
        console.log('----------------')

    };

    res.json({"user_info": newcontent, listSim});

};

const deleteProfile = async (req, res) => {
const _id = req.params.id;
let result = await Profile.remove({ _id });
    if (result) {
        res.redirect('/admin/profile');
    };
};

module.exports = {
    getAddProfile,
    postCreateProfile,
    getProfile,
    getViewProfile,
    crawProfileDetail,
    deleteProfile
};