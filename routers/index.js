const express = require('express');
const authRouter = require('./auth.js');
const userRouter = require('./user.js');
const uploadRouter = require('./upload.js');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/upload', uploadRouter);

module.exports = router;