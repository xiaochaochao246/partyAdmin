const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//心得总结
const hearts = new mongoose.Schema({
    status: {//心得总结的状态  0表示未审核，1表示未通过审核，2表示通过审核
        type: Number,
        default:0
    },
    userId: { //发布心得总结的人的身份证号
        type: String,
        index: true     //建立索引，提高查询速度
    },
    img: { //党员上传的心得总结（一张照片）
        type: String
    },
}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("hearts", hearts)