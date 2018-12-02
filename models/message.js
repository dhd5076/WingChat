var MessageSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    sender: {
        type: String,
        required: [true, 'Sender Required']
    },
    content: {
        type: String,
        required: [true, 'Content Required']
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = mongoose.model('Message', MessageSchema);