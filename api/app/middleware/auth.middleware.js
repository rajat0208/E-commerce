const Jwt=require("jsonwebtoken");
const Config=require("../../config/config");
const UserModel=require("../model/user.model");

const loginCheck=async(req,res,next)=>
{
    try
    {
        let token=null;
        if(req.headers["authorization"])
        {
            token=req.headers["authorization"];
        }
        if(!token)
        {
            next(
                {
                    status:401,msg:"Please login first"
                }
            )
        }
        else{
            let parts=token.split(" ");
            token=parts.pop( );
            if(!token)
            {
                next({status:401,status:"token not provided"})
            }
            else
            {
                let data=Jwt.verify(token,Config.JWT_SECRET);
                if(data)
                {
                    let user=await UserModel.findById(data.id)
                    if(user)
                    {
                        req.auth_user=user;
                        next();
                    }
                    else
                    {
                        next({status:404,msg:"user does not exist"})
                    }
                }
                else
                {
                    next({satus:401,msg:"Invalid Token"})
                }
            }
        }
    }
    catch(error)
    {
        next({status:401,msg:error})
    }
}
module.exports=loginCheck;