let express=require("express");
let router=express.Router();
let users=require('../../database/model/partys')
router.post('/loginout',(req,res)=>{
        //console.log(req.session.user)
        req.session.user=''
        res.json({
            data:'退出登陆成功',
            code:200,
            msg:'退出登陆成功',
            ret:true
        })
     
})
module.exports=router;