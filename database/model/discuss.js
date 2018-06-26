const mongoose=require("mongoose")
const discuss=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    status:{ //民主评议的状态。0为新添加的，尚未开启的。1为已经开启，2为已经关闭的
        type:Number,
        default:0
    }
},{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}})
module.exports = mongoose.model("discuss",discuss)
