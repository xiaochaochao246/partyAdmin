let express=require("express")
let router=express.Router();
let report=require("../../database/model/reports");
let score=require("../../database/model/scores")

router.post("/add", (req, res, next) => { //用户上传思想汇报
    console.log(req.session);
    if(req.session.user){
        let {img,status} = req.body;
        let userId = req.session.user.idCardNumber;
        report.findOne({img,userId}).then(dt => { //去重查询
        if(dt == null){
            report.create({img,status,userId}).then(data => {
                res.json({
                    data,
                    code: 200,
                    msg: "success"
                })
            }).catch(err => {
                next(new Error(err))
            })
        }
        else {
            res.json({
                data: "不能重复提交思想汇报",
                code: 400,
                msg: "不能重复提交思想汇报"
            })
        }
    })
    }else{
        res.json({
            data:"此操作需登录",
            code:400,
            msg:"此操作需登录"
        })
    }
})

router.post("/update", (req, res, next) => {
    const {img,status,id} = req.body;
    report.update({_id: id},{$set: {img,status}}).then(data => {
        res.json({
            data:"success",
            code: 200,
            msg: "success"
        })
        score.create({type: 4,score: 3,userId: req.session.user.idCardNumber, typeName: "上传思想汇报", }).then(data => {
            console.log(data)
        })
    }).catch(err => {
        new Error(err);
        next(err);
    })
})
router.get("/get", (req, res, next) => {
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
    report.find(params).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
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
})
//获取已经审核通过的汇报
router.get("/getReports",(req,res,next)=>{
    let{status,page=1,pageSize=8}=req.query
    if(req.session.user){
        report.find({status:2,userId:req.session.user.idCardNumber}).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
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
    }
    
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;
    report.remove({_id: id}).then(data => {
        //console.log(data)
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
                msg: "该id不存在或者已删除"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err);
    })
})

module.exports = router;