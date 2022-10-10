const express = require('express');
const router = express.Router();
const {login, register} = require('../controllers/authController');

router.post('/login', async (req,res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        res.json(user);
    } catch (err) {
        res.status(409).send(err.message);
    }
});

router.post('/register', async (req,res) => {
    // validation
    if(!req.body.password || req.body.password.length < 8) {
        res.status(400).send('password must contain at least 8 characters');
        return;
    }
    // call logic
    try {
        const newUser = await register(req.body.username, req.body.email, req.body.password);
        res.json(newUser);
    } catch (err) {
        res.status(409).send(err.message);
    }

});

module.exports = router;