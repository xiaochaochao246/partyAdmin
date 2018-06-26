const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalSummary = new mongoose.Schema({
    discussId: {//评议人的身份证号
        type: String
    },
    userId: { //发布总结的人的身份证号
        type: String,
        index: true     //建立索引，提高查询速度
    },
    pic: { //党员上传的总结（一张照片）
        type: String
    },
    common: [    //存放其他用户评议的数组
        {
            evaluate: {
                type: Number,
                default: 0
            },
            otherUserId: {
                type: String,
                require: true
            }
        }
    ]
}, {versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("personalSummary", personalSummary)