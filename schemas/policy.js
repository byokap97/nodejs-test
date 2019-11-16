var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var policySchema = new Schema({
    id: {
        type: String,
        required: [true, 'you must put the id from policy'],
        unique: true
    },
    amountInsured: {
        type: String, 
        required: [true, 'you must put the amountInsured from policy']
    }, 
    email: {
        type: String,
        required: [true, 'you must put the email from policy'],
        unique: true
    },
    inceptionDate: {
        type: Date,
        required: [true, 'you must put the inceptionDate from policy'],
    },
    installmentPayment: {
        type: Boolean,
        required: [true, 'you must put the installmentPayment from policy'],
    },
    clientId: {
        type: Date,
        required: [true, 'you must put the clientId from policy'],
    },

});

var policy = mongoose.model('policy', policySchema);

module.exports = policy;