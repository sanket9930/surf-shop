const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    email : String,                 
    image : String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);



/*
User model = database schema or structure
email - string
password - string
username - string
image - string
posts - array of Object (ref post)
*/