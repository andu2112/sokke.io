const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const schema= new mongoose.Schema({
    username:{
       type:String,
       unique: true,
       required: true
    },
    password:{
        type:String,
        required: true
    }
})

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",schema)