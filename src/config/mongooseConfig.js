import mongoose from "mongoose";

export default function connectDb(){
    mongoose.connect("mongodb://localhost:27017/projectdb")
        .then(() => {
            console.log("Connected to MongoDB successfully");
        }).catch((err) => {
            console.log("Error in connecting to db");
        })
}