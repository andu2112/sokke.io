const mongoose = require("mongoose");

// lage skjema
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

// eksportere chat model
module.exports = mongoose.model("Chat",chatschema)