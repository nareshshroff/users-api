var mongoose = require('mongoose');

var userObj = mongoose.model('user', {
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    }
});

module.exports = {userObj};