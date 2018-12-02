var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: [true, 'Username Required']
    },
    first_name: {
        type: String,
        required: [true, 'First Name Required']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name Required']
    },
    password_hash: {
        type: String,
        required: [true, 'Password Required']
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password_hash')) return next();

    bcrypt.genSalt
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};