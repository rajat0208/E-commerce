const mongoose =require("mongoose");
const Config = require("./config")

mongoose.connect(Config.MONGO_URL).then((res)=>
{
    console.log("Db service conencted")
})
.catch((err) =>
{
    console.log("Error :",err)
})