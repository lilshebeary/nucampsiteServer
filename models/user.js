const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

// {
//     "name": "Redux Woods Campground",
//     "image": "images/redux-woods.jpg",
//     "elevation": 42,
//     "featured": true,
//     "cost": 55,
//     "description": "You'll never want to leave this hidden gem, deep within the lush Redux Woods."
// }

// {"username": "test", "password": "password", "firstname": "janey", "lastname": "doe"}

// {"username": "test", "password": "password"}