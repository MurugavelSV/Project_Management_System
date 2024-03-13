import ApplicationError from "../errorHandlers/applicationError.js";
import { userModel } from "./userSchema.js";

export default class UserRepository{

    async signUp(userName, email, college, password, userType){
        const user = await userModel.findOne({
            userName: userName
        });
        if(user){
            throw new ApplicationError("User already exist", 400);
        }
        const userData = new userModel({
            userName,
            email,
            college,
            password,
            userType
        });
        await userData.save();
    }

    async findUser(email){
        const user = await userModel.findOne({
            email: email
        });
        return user;
    }

}