const mongoose=require("mongoose")
const newsCategory = new mongoose.Schema({
    label:{
        type:Number
    },
    value:{
        type:String,
        unique:true
    }
},{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}});

module.exports = mongoose.model("newsCategory", newsCategory);