import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    uploaderId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'  
    },
    domain: String,
    title: String,
    reportUrl: String
});

export const ProjectModel = mongoose.model("Projects", projectSchema);