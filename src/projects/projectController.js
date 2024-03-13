import ProjectRepository from "./projectRepository.js";

export default class ProjectController{
    constructor(){
        this.projectRepository = new ProjectRepository();
    }

    async uploadProject(req, res){
        try{
            const uploaderId = req.userId;
            const {domain, title} = req.body;
            const reportUrl = req.file.filename;
            await this.projectRepository.uploadProject(uploaderId, domain.toLowerCase(), title, reportUrl);
            return res.status(200).send("Project uploaded");   
        }catch(err){
            return res.status(500).send("Unexpected error in the database");
        }
    }

    async getProjects(req, res){
        try{
            const domain = req.query.domain;
            const projects = await this.projectRepository.getProjects(domain);
            return res.status(200).send(projects);
        }catch(err){
            return res.status(500).send("Unexpected error in the database");
        }
    }

}