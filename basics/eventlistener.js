
let counter=0;
let Name=""
const count=()=>
{   
    if(Name=="")
    { 
        Name=prompt("Enter your name :")
        document.getElementById("Text").innerHTML="Start";
    }
    else
    {
    counter++;
    document.getElementById("counter").innerHTML=counter;
    }
    setTimeout(() => 
    {
        document.getElementById('Text').disabled=true
        document.getElementById("text").innerHTML=Name+" pressed for "+ counter +" times in 10 sec"
        document.getElementById("counter").innerHTML=0
    },10000);
}


