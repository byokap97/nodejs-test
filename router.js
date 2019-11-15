const express = require('express');
const router = express.Router();
const user = require('./controllers/user');
const policy = require('./controllers/policy');

router.get('/user/id/:id', user.findById);
router.get('/user/name/:name', user.findByName);

router.get('/policy/user/name/:name', policy.findByUserName);
router.get('/policy/number/:number', policy.findByPolicyNumber);

module.exports = router;

