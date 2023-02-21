
class user{
    constructor()
    {
        console.log("I am cunstructor");
    }
    getuser(){
    
        return{
            name:"user name"
        }
}
}
class Admin extends user{
    constructor()
    {
        super();
        console.log("I am cunstructor of admin");
    }
    getuser()
    {

        let result=super.getuser();
        console.log(result);
        return{
            name:"admin name"
        }
    }
}
class Customer extends user{
    constructor()
    {
        super();
        console.log("I am cunstructor of customer");
    }
}
const User=new user();
const admin=new Admin();
const customer=new Customer();
admin.getuser();
//write a program to collect user infromation from the user.
//name email,address
//populate an array with custom user class object 
//by using map function populate a html table with the usr data.
//when the page is refreshed , the table should be reset otherwise
//all the data should in the same page
