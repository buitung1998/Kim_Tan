const { Sim, Addpg, Profile } = require('../models');
const fbAction = require('../boc_fb');

const searchPhoneNumber = async (req, res) => {
  const phone = req.query.q;
  let encodePhone = encodeURI(phone);
  let linkCraw = [];
  if (phone) {
    linkCraw = await fbAction.bocFacebook(encodePhone);    
  };

  res.render('boc-sim', {
    linkCraw,
    phone,
  });
};

const crawlerDetail = async (req, res) => {
  const link = req.query.link;

  const data = await crawlink(link);
  if(data != []) {
    console.log('content HTML');
  };

  const content = await contentDetail(data);
  // console.log(content);

  const userCraw = await crawlerUserDetail(content);
  if(userCraw != []) {
    console.log('userCraw')
  };

  const newcontent = await originalContent(content);
  if(content != []) {
    console.log('content')
  };

  const listSim = await crawlerLinkDetail(content);
  // console.log(listSim)
  if(listSim != []) {
    console.log('data list sim');
    console.log('----------------')

  };
  res.json({"data_info": userCraw, listSim, "data_content": newcontent,});

};

const getProductSim = async (req, res) => {
  let sim = await Sim.find({});
  res.render('product-sim', {
    sim
  })
};

const searchProduct = async (req, res) => {
 var query = await req.query.q;
 
  let result = await Sim.find({});
    if(query == null) {
      res.end();
    } else {
      let matchedPhone = result.filter((phone) => {
        return phone.sim.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      res.render('product-sim', {
        sim: matchedPhone,
        val: query
      })
  }
};

// getCreatePhone = async (req, res) => {
//   let sim = req.body.sosim;
//   let simfull = req.body.simfull;
//   let price = req.body.price;

//   let data = [];
//   var dtcheck = [];
//   sim.map(val => {
//     data.push({ sim: val });
//   })
//   simfull.map((val, key) => {
//     data[key].sim_full = val;
//   });
//   price.map((val, key) => {
//     data[key].price = val;
//   })
//   var countRecord = await Sim.find({});
//   var count = countRecord.length;
//   var i, result;
//   var countData = data.length;
  
//   if(countData > 0){
//     for(i = count ; i< countData ; i++){
//          dtcheck.push(data[i]);
//     } 
//   }
//   if ( countData > 0 ) {
//     result = await Sim.create(dtcheck);
//   }else{
//       result = await Sim.create(data);
//   }
//   if(result) {
//     res.redirect('/boc_sim')
//   } else {
//     console.log('an l roi')
//   }
// };

const getCreatePhone = async (req, res) => {
  let urlFb = req.body.link;
  let user_info = req.body.user;
  let Phone = req.body.sim;
  let price = req.body.price;

  console.log(urlFb, user_info, Phone, price);
  // let data = [];
  // urlFb.map(val => {
  //   data.push({ sim: val });
  // })
  // dataNumberPhone.map((val, key) => {
  //   data[key].sim = val;
  // });
  // price.map((val, key) => {
  //   data[key].price = val;
  // })
  
  // let result = await Sim.create(data);
  // if(result) {
  //   res.redirect('/boc_sim')
  // } else {
  //   console.error();
  // }
};


module.exports = {
  searchPhoneNumber,
  crawlerDetail,
  getProductSim,
  searchProduct,
  getCreatePhone,

};