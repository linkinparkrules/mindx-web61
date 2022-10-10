const express = require('express');
const router = express.Router();
const {getUser} = require('../controllers/userController');
const {authMdw, requireAdmin} = require('../middleware/authMdw');

router.get('/', authMdw, requireAdmin, async (req,res) => {
    const admin = await getUser();
    res.json(admin);
});

module.exports = router;