var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    sender: {
        type: String,
        required: [true, 'Sender Required']
    },
    receiver: {
        type: String,
        required: [true, 'Receiver Required']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Date Required']
    },
    amount: {
        type: Number,
        default: Date.now,
        required: false
    },
    hash: {
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);