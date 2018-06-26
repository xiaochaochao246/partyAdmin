const {Router} = require("express");
const router = Router();

var score = require("../database/model/scores");
//引入爬取数据的文件
const getData=require('./getData')

router.use("/uploadToken", require("../util/qiniuConfig"));
router.use("/cat",require("../controller/Category"))

router.use("/partycats",require("../controller/partycats"))
router.use("/news",require("../routes/admin/news"))
router.use("/interaction",require("../routes/admin/interaction"))
router.use("/personalSummary",require("../routes/admin/summary"))
router.use("/discuss",require("../routes/admin/discuss"))
router.use("/reports",require("../routes/admin/reports"))
router.use("/hearts",require("../routes/admin/heartSummary"))
router.use("/slider",require("../routes/admin/slider"))
router.use("/scores",require("../routes/admin/scores"))
router.use("/partys",require("../routes/home/isLogin"))
router.use("/partys",require("../routes/home/login"))
router.use("/partys",require("../routes/admin/partys"))
router.use("/partys",require("../routes/home/loginout"))

router.get("/getDate",(req,res)=>{
    //使用getData.js文件
    getData().then(data => {
        res.json({
            data:data,
            code:200,
            msg:"success"
        })
    })
    if(req.session.user){
        score.create({type: 10,score: 10,userId: req.session.user.idCardNumber, typeName: "查看党史", }).then(data => {
            
        })
        return;
    }
})

router.use((req,res,next)=>{
    //console.log(req.session)
    if(!req.session.user){
        res.json({
            data:'用户未登录',
            code:401,
            msg:'用户未登录',
            ret:false
        })
        return
    }
    next()
  })
  router.use("/user",require("../routes/home/getSess"))
router.use("/partys",require("../routes/home/changepwd"))

module.exports = router;