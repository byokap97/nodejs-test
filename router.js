const express = require('express');
const router = express.Router();
const user = require('./controllers/user');

router.get('/user/id/:id', user.findById);
router.get('/user/name/:name', user.findByName);

module.exports = router;

