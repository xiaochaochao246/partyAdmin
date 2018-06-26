const mongoose=require("mongoose")
const partycats = new mongoose.Schema({
    label:{
        type:Number
    },
    type:{
        type:String,
        unique:true
    },
},{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}});

module.exports = mongoose.model("partycats", partycats);