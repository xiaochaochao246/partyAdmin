const mongoose = require("mongoose")

const invitation = new mongoose.Schema({
    isParent:{
        type:Number,
        default:0,
    },
    userId:{//评论人id
        type:String
    },
    userAvatar:{//评论人头像
        type:String
    },
    userName:{//评论人姓名
        type:String,
    },
    toUserId:{//回复哪个人
        type:String
    },
    toUserName:{//回复人的名字
        type:String
    },
    toUserAvatar:{//回复人的头像
        type:String
    },
    parentId:{ //回复的帖子ID
        type:String,
        default:''
    },
    content:{//回复的内容
        type:String
    }
},{versionKey:false,timestamps:{createdAt:"createTime",updatedAt:"updateTime"}})

module.exports=mongoose.model("invitation",invitation)