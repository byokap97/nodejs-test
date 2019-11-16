var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
    id: {
        type: String,
        required: [true, 'you must put the id from user'],
        unique: true
    },
    name: {
        type: String, 
        required: [true, 'you must put the name from user']
    }, 
    email: {
        type: String,
        required: [true, 'you must put the email from user'],
        unique: true
    },
    role: {
        type: String,
        required: [true, 'you must put the role from user'],
    },

});



userSchema.methods.generateJWT = function () {
    return jwt.sign({
        username: this.name,
        id: this.id,
        type: this.role
    }, 'node_test', {
        expiresIn: "1h"
    });
}

userSchema.methods.toAuthJSON = function () {
    return {
        id: this.id,
        name: this.name,
        token: this.generateJWT(),
    };
};

var user = mongoose.model('user', userSchema);

module.exports = user;
