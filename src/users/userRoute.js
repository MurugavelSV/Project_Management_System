import express from "express";
import UserController from "./userController.js";

const router = express.Router();

const userController = new UserController();

router.post('/sendOTP', (req, res) => {
    userController.verifyUser(req, res);
})

router.post('/signup', (req, res) => {
    userController.signup(req, res);
});

router.post('/signin', (req, res) => {
    userController.signin(req, res);
})

export default router;