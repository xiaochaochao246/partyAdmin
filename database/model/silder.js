const mongoose = require("mongoose");

const slide = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    sort: {
        type: Number,
        default: 999999
    },
    img: {
        type: String
    },
    isShow: {
        type: Boolean,
        default: false
    }
}, {versionKey: false, timestamp: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model("slide", slide)