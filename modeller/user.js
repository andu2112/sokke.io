const { default: mongoose } = require("mongoose")
const schema=require("moongose")


const schema= new mongoose.Schema({
    username:{
       type:String
    },
    passwrod:{
        type:String
    }
})




module.exports=moongose.model("User",schema)