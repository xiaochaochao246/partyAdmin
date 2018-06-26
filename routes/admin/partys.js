let express = require("express")
let router = express.Router();
var md5 = require('blueimp-md5');
let partys = require("../../database/model/partys");
router.post("/add", (req, res, next) => {
    let {
        avatar,
        userName,
        idCardNumber,
        homeAddress,
        workAddress,
        nation,
        weChat,
        qqNumber,
        sex,
        education,
        jobTitle,
        emolument,
        enterPartyTime,
        paymentTime,
        partyStatus,
        pwd,
        phone,
        level
    } = req.body;
    
    function isCardNo(idCard) {
        console.log(idCard);
        rgb = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (rgb.test(idCard) === true) {
            partys.findOne({idCardNumber}).then(dt => {
                if (dt === null) {
                    partys.create({
                        avatar,
                        userName,
                        idCardNumber,
                        homeAddress,
                        workAddress,
                        nation,
                        weChat,
                        qqNumber,
                        sex,
                        education,
                        jobTitle,
                        emolument,
                        enterPartyTime,
                        paymentTime,
                        partyStatus,
                        pwd:md5(pwd),
                        phone,
                        level
                    }).then(data => {
                        res.json({
                            data: "success",
                            code: 200,
                            msg: "用户添加成功"
                        })
                    }).catch(err => {
                        new Error(err)
                        next(err)
                    })
                } else {
                    res.json({
                        data: "用户已存在",
                        code: 400,
                        msg: "用户已存在"
                    })
                }
            }).catch(error => {
                next(new Error(error))
            })
        } else {
            res.json({
                data: "身份证号不合法",
                code: 400,
                msg: "身份证号不合法"
            })
        }
    }
    isCardNo(idCardNumber)
})
router.get('/get', (req, res, next) => {
    let {page = 1, pageSize = 5, id, branchName} = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let params = {}
    //console.log(id)
    if (!id) {
        params = branchName == undefined ? {} : {branchName}
        partys.find(params).limit(pageSize).skip((page - 1) * pageSize).sort({_id: -1}).then(data => {
            res.json({
                data,
                code: 200,
                msg: "success",
                ret: true
            })
        }).catch(err => {
            new Error(err)
            next(err)
        })
    }
    else {
        params._id = id;
        partys.find(params).sort({_id: -1}).skip((page - 1) *pageSize).limit(pageSize).exec((err, data) => {
            if (err) {
                res.json({
                    data: err,
                    code: 500,
                    ret: false,
                    msg: 'false'
                })
                return
            }
            res.json({
                data,
                code: 200,
                ret: true,
                msg: 'success'
            })
        })
    }
})

router.post("/update", (req, res, next) => {
    const {
        userName,
        avatar,
        idCardNumber,
        homeAddress,
        workAddress,
        nation,
        weChat,
        qqNumber,
        sex,
        education,
        jobTitle,
        emolument,
        enterPartyTime,
        paymentTime,
        partyStatus,
        phone,
        level,
        id
    } = req.body;
    partys.update({_id: id}, {
        $set: {
            userName,
            idCardNumber,
            homeAddress,
            avatar,
            workAddress,
            nation,
            weChat,
            qqNumber,
            sex,
            education,
            jobTitle,
            emolument,
            enterPartyTime,
            paymentTime,
            partyStatus,
            phone,
            level,
        }
    }).then(data => {
        res.json({
            data: "success",
            code: 200,
            msg: "更新成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})
router.post("/del", (req, res, next) => {
    const {id} = req.body;
    partys.remove({_id: id}).then(data => {
        if (data.n > 0) {
            req.session.user=''
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
                msg: "不存在的id"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err)
    })
})

module.exports = router;