import { ProjectModel } from "./projectSchema.js";

export default class ProjectRepository{
    async uploadProject(uploaderId, domain, title, reportUrl){
        const project = new ProjectModel({
            uploaderId, 
            domain,
            title,
            reportUrl
        });
        await project.save();
    }

    async getProjects(domain){
        const projects = domain? await ProjectModel.find({domain}): await ProjectModel.find({});
        return projects;
    }
}