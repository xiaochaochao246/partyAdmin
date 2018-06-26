let express=require("express")
let router=express.Router();
let personalSummary=require("../../database/model/personalSummary");
let score=require("../../database/model/scores")

router.post("/add", (req, res, next) => { //用户上传个人总结
    if(req.session.user){
        let {pic,discussId} = req.body;
        let userId = req.session.user.idCardNumber;
        personalSummary.findOne({discussId,userId}).then(dt => { //去重查询
        if(dt == null){
            personalSummary.create({pic,discussId,userId,common: []}).then(data => {
                res.json({
                    data: "success",
                    code: 200,
                    msg: "success"
                })
                if(req.session.user){
                    score.create({type: 3,score: 3,userId: req.session.user.idCardNumber, 
                        typeName: "上传个人总结"}).then(data => {
                        //console.log(data)
                    })
                }
            }).catch(err => {
                next(new Error(err))
            })
        }
        else {
            res.json({
                data: "不能重复提交个人总结",
                code: 400,
                msg: "不能重复提交个人总结"
            })
        }
    })
    }  
})
module.exports = router;