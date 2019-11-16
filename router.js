const express = require('express');
const router = express.Router();
const user = require('./controllers/user');
const policy = require('./controllers/policy');
const auth = require('./auth');
const db = require('./controllers/database');

db.connectToServer();

router.get('/user/id/:id', auth.required, auth.errors, user.findById);
router.get('/user/name/:name', auth.required, auth.errors, user.findByName);

router.get('/policy/user/name/:name', auth.required, auth.errors, auth.adminToken, policy.findByUserName);
router.get('/policy/number/:number', auth.required, auth.errors, auth.adminToken, policy.findByPolicyNumber);
router.post('/login',  user.login);

module.exports = router;

