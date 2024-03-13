import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    college: String,
    password: String,
    userType: String
})

export const userModel = mongoose.model("Users", userSchema);