const mongoose = require("mongoose");

const chatschema= new mongoose.Schema({
    msg:{
       type:String,
       required: true
    },
    sender: {
        type:String,
        required: true
    },
    room: {
        type:String,
        required: true
    }
})
module.exports = mongoose.model("Chat",chatschema)