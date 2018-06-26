let express=require("express")
let router=express.Router();
const slider = require("../../database/model/silder");
router.post("/add", (req, res, next) => {
    const {title, img, url, isShow, sort} = req.body;
    slider.create({title, img, url, isShow, sort}).then(data => {
        res.json({
            data: "success",
            code: 200,
            msg: "success"
        })
    }).catch(err => {
        new Error(err);
        next(err)
    })
})

router.get("/get", (req, res, next) => {
    let{id,page=1, pageSize=5}=req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    // let pn=req.query.pn || 1
    let params={}
    if(!id){
        params={}
    }else {
        params._id=id;
    }
    slider.find(params).sort({_id:-1}).skip((page-1)*pageSize).limit(pageSize).exec((err,data)=>{
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

router.post("/update", (req, res, next) => {
    const {title, img, url, isShow, sort, id} = req.body;
    slider.update({_id: id},{$set: {title, img, url, isShow, sort}}).then(data => {
        res.json({
            data:"success",
            code: 200,
            msg: "success"
        })
    }).catch(err => {
        new Error(err);
        next(err);
    })
})

router.post("/del", (req, res, next) => {
    const {id} = req.body;

    slider.remove({_id: id}).then(data => {
        console.log(data)
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