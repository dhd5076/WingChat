var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: [true, 'Username Required']
    },
    firstname: {
        type: String,
        required: [true, 'First Name Required']
    },
    lastname: {
        type: String,
        required: [true, 'Last Name Required']
    },
    password: {
        type: String,
        required: [true, 'Password Required']
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(4, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);