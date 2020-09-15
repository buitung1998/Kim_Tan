const express = require('express');
const router = express.Router();
const  { accController }  = require('../controllers');

router.get('/login', accController.getLogin);
router.post('/login', accController.checkLogin);

// router.get('/test', accController.getTest);
// router.post('/test', accController.test);

module.exports = router;