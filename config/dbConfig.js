const mongoose=require("mongoose")
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/PartyProject")
const db=mongoose.connection;
db.once("open",()=>{
    console.log("数据库连接成功")
})

