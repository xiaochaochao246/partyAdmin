const {Router}=require("express");
const router=Router();
const partycats=require("../database/model/partycats");

router.post("/add",(req,res,next)=>{
    const {label,type}=req.body;
    console.log(label,type);
    partycats.create({label,type}).then(data=>{
        res.json({
            data:'分类插入成功',
            code:200,
            msg:"success"
        })
    }).catch(err=>{
        const error = new Error(err)
        next(err);
    })
})

router.get("/get",(req,res,next)=>{
    let{id,page=1,pageSize=5}=req.query
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    // let pn=req.query.pn || 1
    let params={}
    if(!id){
        params={}
    }else {
        params._id=id;
    }
    partycats.find(params).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
        if(err){
            res.json({
                data:err,
                code:500,
                ret:false,
                msg:'false'
            })
            return
        }
        res.json({
            data,
            code:200,
            ret:true,
            msg:'success'
        })
    })
});

router.post("/update",(req,res,next)=>{
    const {type,label,id}=req.body;
    partycats.update({_id: id},{$set: {type,label,updateTime:new Date()}}).then(data => {
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
    partycats.remove({_id: id}).then(data => {
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

