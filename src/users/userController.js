import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otp from "otp-generator";
import nodemailer from "nodemailer";
import ApplicationError from "../errorHandlers/applicationError.js";
import UserRepository from "./userRepository.js";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
        this.otp = null;
        this.userInfo = {};
    }

    async verifyUser(req, res){
        try{
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "muruvel19.10@gmail.com",
                    pass: "jebd pspj yvth kqqx"
                }
            });
            const otpCode = otp.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            const mailOptions = {
                from: "muruvel19.10@gmail.com",
                to: req.body.email,
                subject: "Verify user(OTP)",
                text: `Your One Time Password(OTP) is ${otpCode}`
            };
            console.log(req.body);
            await transporter.sendMail(mailOptions);
            this.otp = otpCode;
            this.userInfo = req.body;
            return res.status(200).send("OK");
        }catch(err){
            console.log(err.message);
            return res.status(500).send("Internal server error");
        }
    }

    async signup(req, res){
        try{
            console.log(this.userInfo);
            const{userName, email, college, password, userType} = this.userInfo;
            const {otp} = req.body;
            console.log(otp)
            if(this.otp == Number.parseInt(otp)){
                const hashedPassword = await bcrypt.hash(password, 12);
                await this.userRepository.signUp(userName, email, college, hashedPassword, userType);
                return res.status(201).send("Signed in successfully");
            }else{
                throw new ApplicationError("Incorrect OTP", 400);
            }
        }catch(err){
            console.log(err.message);
            if(err instanceof ApplicationError){
                return res.status(err.code).send(err.message);
            }else{
                return res.status(500).send("Unexpected error in the database");
            }
        }
    }

    async signin(req, res){
        try{
            const{email, password} = req.body;
            const user = await this.userRepository.findUser(email);
            if(user){
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if(isMatch){
                        const token = jwt.sign({
                            id: user._id,
                            email: user.email,
                            userType: user.userType
                        }, process.env.JWT_Token, {
                            expiresIn: "1h"
                        });
                        return res.status(200).send(token);
                    }else{
                        return res.status(400).send("Invalid credentials");
                    }
                }).catch((err) => {
                    // console.log(err.message);
                    throw new ApplicationError("Internal server error", 500);
                });
            }else{
                return res.status(400).send("Invalid credentials");
            }
        }catch(err){
            return res.status(500).send("Unexpected error in the database");
        }
    }
}