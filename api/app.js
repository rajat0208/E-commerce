const express=require("express");
const cors=require("cors");

const app =express();
app.use(cors());

// middleware
require("./config/mongodb.config");
const routes = require("./routes/");

app.use(express.json())

app.use("/api/v1",routes)


app.use((req, res, next) => {
    next({ status: 404, msg: "Resource not found"});
});

app.use((error, req, res, next) => {
    console.log("ErrorHandling: ",error)
    let status_code= error.status || 500;
    let msg = error.msg ?? error; 

    res.status(status_code).json({
        result: null,
        status: false,
        msg: msg
    });
});

app.listen(9005, 'localhost', (err) => {
    if(!err){
        console.log("Server is running on port: "+9005)
        console.log("press CTRL+C to disconnect")
    }
})



