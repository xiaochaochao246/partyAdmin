var express=require("express");
var router=express.Router();
var partys=require('../../database/model/partys')
var score = require("../../database/model/scores");
var md5 = require('blueimp-md5');
router.post("/login",(req,res)=>{
    var {idCardNumber,pwd}=req.body;
    if(!idCardNumber){
        res.json({
            data:'请输入用户名',
            code:400,
            msg:'请输入用户名',
            ret:false
        })
        return
    }
    else if(!pwd){
        res.json({
            data:'请输入密码',
            code:400,
            msg:'请输入密码',
            ret:false
        })
        return
        
      }else{//登录验证部分
        function isCardNo(card){
            reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if(reg.test(card)==true){
                partys.findOne({idCardNumber},(err,data)=>{
                    if(data==null){
                        res.json({
                            data:'用户名不存在',
                            code:400,
                            ret:false
                        })
                        return
                    }
                    else if(md5(pwd)==data.pwd){
                        req.session.user=data;
                        res.json({
                            data,
                            code:200,
                            msg:'登录成功',
                            ret:true
                        })
                        score.create({type: 1, score: 5,typeName: "登录", userId: idCardNumber}).then(data => {
                        })
                        return
                    }else{
                        console.log(data.pwd);
                        res.json({
                            data:'密码输入不正确',
                            code:400,
                            msg:'密码输入不正确',
                            ret:false
                        })
                    }
                })
            }else{
                res.json({
                    data:"用户名输入不合法",
                    code:400,
                    msg:"用户名输入不合法"
                })
            }
        }
        isCardNo(idCardNumber)
    }
})

module.exports=router;