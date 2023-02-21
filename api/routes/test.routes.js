const express = require ("express");
const app = express();

app.get("/",(req,res)=>{
    res.json({
        status:true,
        msg:"Home data fetched",
        result:"Hello World"
    });
});

app.post("/",(req,res)=>{

})

app.put("/content",(req,res)=>{

})

module.exports=app;