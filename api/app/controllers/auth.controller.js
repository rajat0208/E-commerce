const authServices = require("../services/auth.services")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../../config/config");
const nodemailer = require("nodemailer");
const sendEmail = require("../services/mail.services");

class authController {
    constructor() {
        this.auth_svc = new authServices();
    }
    //login  
    login = async (req, res, next) => {
        try {
            let data = req.body;
            let user = await this.auth_svc.loginUser(data.email, data.password);
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    res.json
                        ({
                            result:
                            {
                                detail: user,
                                token: jwt.sign({ id: user._id }, config.JWT_SECRET)
                            },
                            status: true,
                            msg: "Logged in successfully"
                        })
                }
                else {
                    throw ("Crdentials does not exist")
                }
            }
            else {
                throw ("User does not exist")
            }
        }
        catch (error) {
            next({ status: 400, msg: error })
        }
    }
    //register
    register = async (req, res, next) => {
        try {
            let data = req.body;
            await this.auth_svc.validateRegisterData(data);
            data.password = bcrypt.hashSync(data.password, 10);
            let response = await this.auth_svc.registerUser(data);
            sendEmail({
                to: data.email,
                subject: "Account registered",
                text: "Plaintext version of the message",
                html: `<p style="background_color:red">Dear ${data.name},You have been registerd in your application.</p>`
            })
            res.json({
                result:
                {
                    response: response
                },
                status: true,
                msg: "Registered user successfully."
            })
        }
        catch (error) {
            console.log(error);
            next({ status: 400, msg: error })
        }
    }
    getLoggedInUser = async (req, res, next) => {
        res.json
            (
                {
                    result: req.auth_user,
                    status: true,
                    msg: "Logged in user fetched"
                }
            )
    }
}
module.exports = authController;