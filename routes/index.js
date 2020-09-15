const express = require('express');
const router = express.Router();
const simRouter = require('./sim-router');
const accRouter = require('./accRouter');
const crawProfile = require('./craw-profile- router');
const crawPage = require('./craw-page-router');
const authMiddleware = require('../middlewares/auth-middleware');

router.use('/admin', accRouter);
router.use('/admin', authMiddleware.requireAuth, simRouter);
router.use('/admin', authMiddleware.requireAuth, crawProfile);
router.use('/admin', authMiddleware.requireAuth, crawPage);


module.exports = router;