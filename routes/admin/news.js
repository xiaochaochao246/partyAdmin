let express=require("express")
let router=express.Router();
let news=require("../../database/model/news");
const score = require("../../database/model/scores");
router.post("/add",(req,res,next)=>{
    const {title,type,img,content,desc,author}=req.body;
    news.create({title,type,img,content,author,desc}).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"success"
        })
    }).catch(err=>{
        new Error(err)
        next(err)
    })
})
 router.get('/get',function (req,res,next) {
    let {page=1, pageSize=5,id, type} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    var params={}
    //console.log(id)
    if(!id){
        params = type == undefined ? {} : {type}
        news.find(params).limit(pageSize).skip((page-1)*pageSize).sort({_id: -1}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success",
                ret:true
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    }
    else {
        params._id = id;
        news.find(params).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
            if(err){
                res.json({
                    data:err,
                    code:500,
                    ret:false,
                    msg:'false'
                })
                return
            }else{             
                news.update(params,{$set:{desc:data[0].desc+1} }).then(dt => {

                })
                res.json({
                    data,
                    code:200,
                    ret:true,
                    msg:'success'
                })
            }
        })
        if(req.session.user){
            score.create({type: 2,score: 0.1,userId: req.session.user.idCardNumber, typeName: "查看新闻", }).then(data => {
                
            })
            return;
        }
    }
})
router.post("/update",(req,res,next)=>{
    const {title,type,img,content,author,desc,id}=req.body;
    news.update({_id: id},{$set: {title,type,img,content,author,desc,updateTime:new Date()}}).then(data => {
        res.json({
            data:"success",
            code:200,
            msg:"更新成功"
        })
    }).catch(err=>{
        new Error(err)
        next(err)
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;
    news.remove({_id: id}).then(data => {
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