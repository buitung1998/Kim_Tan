const express = require('express');
const router = express.Router();
const { simController }  = require('../controllers');
const validate = require('../validates/frofile-validate');

router.get('/boc-sim', simController.searchPhoneNumber);
router.get('/crawer-detail', simController.crawlerDetail);
router.post('/boc-sim', simController.getCreatePhone);

router.get('/product-sim', simController.getProductSim);
router.get('/product-sim/search', simController.searchProduct);



module.exports = router;