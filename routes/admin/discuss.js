let discuss=require("../../database/model/discuss")
let partys=require("../../database/model/partys")
let express=require("express")
let router=express.Router();

router.post("/add",(req,res,next)=>{
    let {title,desc,status}=req.body;//desc是内容
    if(req.session.user){
        discuss.create({title,desc}).then(data=>{
            res.json({
                data:'success',
                code:200,
                msg:"success"
            })
        }).catch(err=>{
            next(new Error(err))
        })
    }else{
        res.json({
            data:'该操作需要管理员权限',
            code:400,
            msg:'该操作需要管理员权限'
        })
    }
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
    discuss.find(params).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
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
router.post("/update",(req,res,next)=>{
    let {status,id,title,desc}=req.body;
    status=parseInt(status);
    if(status && status==1){
        discuss.findOne({status}).then(dt=>{
            if(dt==null){
                discuss.update({_id:id},{$set:{status}}).then(data=>{
                    res.json({
                        data:"民主评议开启成功",
                        code:200,
                        msg:'民主评议开启成功'
                    })
                })
            }else{
                res.json({
                    data:'已经有了一个开启的民主评议',
                    code:400,
                    msg:'已经有了一个开启的民主评议'
                })
            }
        })
    }else if(status&&status==2){
        discuss.update({_id:id},{$set:{status}}).then(data=>{
            res.json({
                data:"评议结束成功",
                code:200,
                msg:'评议结束成功'
            })
        }).catch(err=>{
            next(new Error(err))
        })
    }
})
//用户获取参加民主评议的人员
router.get("/getEnterPeople",(req,res,next)=>{
    if(req.session.user){
        let {page=1,pageSize=10,branchId}=req.body;
       partys.find({branchId},{pwd:0,level:0,isCanLogin:0}).sort({_id: -1}).limit(pageSize).skip((page-1)*pageSize).then(data=>{
        res.json({
            data,
            code: 200,
            msg: "success"
        })
    }).catch(err=>{
        next(new Error(err))
    })
    }
})
module.exports = router;