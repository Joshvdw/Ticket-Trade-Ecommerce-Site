const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// defining the Mongoose Schema for the user
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    number: Number,
    username: String,
    password: String
});

//add a hash and salt field to our Schema in order to store the hashed password and the salt value.
UserSchema.plugin(passportLocalMongoose);

// exports the scema so we can use it
module.exports = mongoose.model("User", UserSchema);