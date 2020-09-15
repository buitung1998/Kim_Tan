const express = require('express');
const router = express.Router();
const { crawProfileController }  = require('../controllers');
const validate = require('../validates/frofile-validate');


router.get('/add-profile', crawProfileController.getAddProfile);
router.get('/profile', crawProfileController.getProfile);
router.get('/profile-view/:id', crawProfileController.getViewProfile);
router.get('/crawler-detail-api', crawProfileController.crawProfileDetail);
router.get('/delete-profile/:id', crawProfileController.deleteProfile); 


router.post('/add-profile', validate.postCreateProfile, crawProfileController.postCreateProfile);

module.exports = router;