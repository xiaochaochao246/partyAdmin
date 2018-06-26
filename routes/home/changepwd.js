let express=require("express");
let router=express.Router();
let users=require('../../database/model/partys')
var validator = require('validator');
var md5 = require('blueimp-md5');
router.post('/updatepwd',(req,res)=>{
    let{pwd,newPwd,confirmPwd}=req.body
    if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            data:'必须输入原密码',
            code:400,
            msg:'必须输入原密码',
            ret:false
        })
        return
    }
    else if(!newPwd||validator.isEmpty(newPwd.trim())){
        res.json({
            data:'必须输入新密码',
            code:400,
            msg:'必须输入新密码',
            ret:false
        })
        return
    }
    else if(newPwd==confirmPwd){
        let idCardNumber=req.session.user.idCardNumber;
        //console.log(userPhone)
        users.findOne({idCardNumber:idCardNumber},(err,data)=>{
            if(err){
                res.json({
                    data:err,
                    code:500,
                    msg:err,
                    ret:false
                })
                return
            }
            if(md5(pwd)==data.pwd){
                users.update({idCardNumber:idCardNumber},{$set:{pwd:md5(newPwd)}},(err,updateData)=>{
                    req.session.user=''
                    res.json({
                        data:'修改成功 请重新登录',
                        code:200,
                        msg:'修改成功',
                        ret:true,
                    })
                    return;
                })
            }else{
                res.json({
                    data:'旧密码不正确',
                    code:200,
                    msg:'旧密码不正确',
                    ret:false
                })
                return
            }
        })
    }else{
        res.json({
            data:"两次输入密码不一致",
            code:400,
            msg:"两次输入密码不一致",
            ret:false
        })
    }
})
module.exports=router