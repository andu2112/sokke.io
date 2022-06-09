const { default: mongoose } = require("mongoose")
const schema=require("moongose")


const chatschema= new mongoose.Schema({
    meldning:{
       type:String
    }

})




module.exports=mongoose.model("Chat",chatschema)