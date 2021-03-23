const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
//email and password are added by passport local mongoose
const UserSchema = new Schema({
    email: String,
    image: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref:'Post'
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);