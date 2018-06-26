var mongoose=require('mongoose')
var newSchema=new mongoose.Schema({
    content:{
        type:String
    },
    title:{
        type:String
    },
    img:{
        type:String
    },
    author:{
        type:String
    },
    desc:{
        type:Number,
        default:0
    },
    type:{
        type:String
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

module.exports= mongoose.model('news',newSchema,'news')