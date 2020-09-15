module.exports.postCreateProfile = async (req, res, next) => {

    let ten_tho = await req.body.name_worker;
    let link = await req.body.link;
    // let status = await req.body.status;
    let values = req.body;
    var error = [];

    if(!ten_tho) {
        error.push('name is required');
    };
    if(!link) {
        error.push('link is required');
    };
    // if(!status) {
    //     error.push('status is required');
    // };
    if(error.length) {
        res.render('view-add/add-profile', {
            error,
            values
        });
        return;
    };
    next();
};

module.exports.postAddPage = async (req, res, next) => {

    let ten_tho = await req.body.name_worker;
    let link = await req.body.link;
    let values = req.body;
    var error = [];

    if(!ten_tho) {
        error.push('name is required');
    };
    if(!link) {
        error.push('link is required');
    };
    if(error.length) {
        res.render('view-add/add-page', {
            error,
            values
        });
        return;
    };
    next();
};