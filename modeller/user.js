const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

// lage user skjema
const schema= new mongoose.Schema({
    username:{
       type:String,
       unique: true,
       required: true
    },
    password:{
        type:String
    }
})

// bruke passport plugin
schema.plugin(passportLocalMongoose);

// eksportere user model
module.exports = mongoose.model("User",schema)