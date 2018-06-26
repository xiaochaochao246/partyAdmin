let express = require("express")
let router = express.Router();
let partys = require("../../database/model/partys");

router.get('/getSess',(req,res,next)=>{
    console.log(req.session.user)
    if(req.session.user){
        partys.findOne({idCardNumber:req.session.user.idCardNumber}).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success",
                ret:true
            })
        })
    }
})

module.exports = router;