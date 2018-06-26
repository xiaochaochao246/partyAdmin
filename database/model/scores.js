const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
    type: {
        type: Number
    },
    score: {
        type: Number
    },
    userId: {
        type: String
    },
    typeName: {
        type: String
    },
    createTime:{
        type:String,
        default:new Date()
    },
    updateTime:{
        type:String,
        default:new Date()
    }
})

module.exports = mongoose.model('score',newSchema,'score')