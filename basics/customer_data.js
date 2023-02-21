let customer=[];
function customer_data()
{
    data();
}
const data=function()
 {
    let username=prompt("enter user name");
    let email=prompt("Enter your email");
    let address=prompt("Enter your address");
    let final_data=
    {
        username : username,
        email : email,
        address : address,
    }
    customer.push(final_data);
    showdata();
}
const showdata=()=>
    {
        let html="";
        customer.map((Customer,index)=>
        {
            html += "<tr>"
            html += "<td>"+(index+1)+"</td>"
            html += "<td>"+Customer.username+"</td>"
            html += "<td>"+Customer.email+"</td>"
            html += "<td>"+Customer.address+"</td>"
            html += "</tr>"
        })  
        document.getElementById("customer_id").innerHTML=html;  
    }