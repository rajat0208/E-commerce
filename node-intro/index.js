const http= require("http");
const app=http.createServer((request,response) =>
{
    response.end('hello world')
});
app.listen(9000,'localhost',(err)=>
{
 if(err)
 {
    console.log("connection error")
 }
 else
 {
    console.log("server running")
 }
})