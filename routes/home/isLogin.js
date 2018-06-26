let express=require("express");
let router=express.Router();
router.get("/islogin",(req,res)=>{
    //console.log(req.session.user)
    if(!req.session.user){
        res.json({
            data:'你未登录',
            code:400,
            msg:'你未登录',
            ret:false
        })
        return
    }
        res.json({
            data:req.session.user,
            code:200,
            msg:'用户一登录',
            ret:true
        })
})
module.exports=router;