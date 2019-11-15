const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'node_test',
        getToken: getTokenFromHeaders,
    }),
    errors: (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).send('invalid token...');
        }
        next();
    },
    adminToken: (req, res, next) => {
        if (req.user.type == undefined || req.user.type != 'admin') {
            return res.status(402).send('invalid token u are not and admin...');
        }
        next();
    },
};

module.exports = auth;

