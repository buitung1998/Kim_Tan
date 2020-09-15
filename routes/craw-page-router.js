const express = require('express');
const router = express.Router();
const { crawPageController }  = require('../controllers');
const validate = require('../validates/frofile-validate');


router.get('/boc-page', crawPageController.getCrawPage);
router.get('/boc-page/add-page', crawPageController.getCreatePage);
router.get('/boc-page/craw-page/:id', crawPageController.getCrawDataPage);
router.get('/crawler-page-api', crawPageController.crawPageDetail)
router.post('/boc-page/add-page', validate.postAddPage, crawPageController.postAddPage);


module.exports = router;