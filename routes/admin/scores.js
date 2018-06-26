let express=require("express")
let router=express.Router();

let score=require("../../database/model/scores")

router.get("/getScores",(req,res,next)=>{
    if(req.session.user){
        let{userId,page=1,pageSize=10}=req.query
        score.find({userId:req.session.user.idCardNumber}).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
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
module.exports = router;