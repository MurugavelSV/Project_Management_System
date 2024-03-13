import express from "express";
import ProjectController from "./projectController.js";
import upload from "../middlewares/fileUploadMiddleware.js";
import checkPlagiarism from "../middlewares/checkPlagiarism.js";

const router = express.Router();

const projectController = new ProjectController();

router.post('/', upload.single('reportUrl'), (req, res) => {
    projectController.uploadProject(req, res);
});

router.get('/', (req, res) => {
    projectController.getProjects(req, res);
})

router.get('/', (req, res) => {
    return res.send("Welcome");
})

export default router;