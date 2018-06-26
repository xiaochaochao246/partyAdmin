let express=require("express")
let router=express.Router();
let interaction=require("../../database/model/interaction");
let partys=require("../../database/model/partys")
const score = require("../../database/model/scores");
//普通用户发起一个帖子
router.post("/add",(req,res,next)=>{
    let {content}=req.body;
    let {idCardNumber,avatar,userName}=req.session.user;
    if(content==''){
        res.json({
            data:"内容不能为空",
            code:400,
            ret:false,
            msg:"内容不能为空"
        })
        return
    }
    interaction.create({
        content,
        userId:idCardNumber,
        userAvatar:avatar,
        userName,
    }).then(data=>{
        res.json({
            data,
            code:200,
            msg:"上传成功"
        })
    }).catch(err=> new Error(err))
    // let parm=req.session.user.idCardNumber;
    // partys.update({idCardNumber:parm},{$set:{quotes:content}}).then(data=>{
    //     //console.log(data)
    // })
    score.create({type: 9,score: 4,userId: req.session.user.idCardNumber, typeName: "上传一条帖子", }).then(data => {
                
    })
})
//普通用户获取帖子列表
router.get("/get",(req,res,next)=>{
    let {page=1,pageSize,id}=req.query
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let params={}
    if(!id){
        interaction.find({isParent:0}).limit(pageSize).skip((page-1)*pageSize).sort({_id: -1})
        .then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        })
    }else{
        params._id=id;
        interaction.findOne({params}).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        })
    }
})
//用户回复一条帖子
router.post("/userRes",(req,res,next)=>{
    let {parentId,   //回复的帖子ID
        content,    //回复的内容
        toUserId,   //回复哪一个人
        toUserName, //回复人的名字
        toAvatar    //回复人的头像
    }=req.body
    let {idCardNumber,avatar,userName}=req.session.user;
    interaction.findOne({
        $or:[
                {_id: parentId, userId: toUserId},
                {parentId, userId: toUserId}
            ]
    }).then(dt => {
    console.log(dt)
    if(dt == null||dt.userName!=toUserName||dt.avatar!=toAvatar){
        res.json({
            data: "非法参数",
            code: 400,
            msg: "非法参数"
        })
        return
    }
    interaction.create({
        isParent:1,
        parentId,
        content,
        toUserId,
        toUserName,
        toAvatar,
        userId:idCardNumber,
        userAvatar:avatar,
        userName,
    }).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"success"
        })
    }).catch(err=> new Error(err))
  })
})
//获取帖子详情
router.get("/getInteraction",(req,res,next)=>{
    let {id,page=1,pageSize}= req.query
    interaction.find({parentId:id}).limit(pageSize).skip((page-1)*pageSize).sort({_id: -1}).then(data=>{
        res.json({
            data,
            code:200,
            msg:"success"
        })
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;
    interaction.remove({_id: id}).then(data => {
        if(data.n > 0){
            res.json({
                data: "success",
                code: 200,
                msg: "删除成功"
            })
        }
        else {
            res.json({
                data: "不存在的id",
                code: 200,
                msg: "不存在的id"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err)
    })
})
module.exports=router;
