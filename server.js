import express from "express";
import connectDb from "./src/config/mongooseConfig.js";
import userRouter from "./src/users/userRoute.js";
import projectRouter from "./src/projects/projectRoute.js";
import jwtAuth from "./src/middlewares/jwtAuthMiddleware.js";

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.get('/', (req, res) => res.send("Welcome to Express app"));

app.use('/api/users', userRouter);

app.use('/api/projects', jwtAuth, projectRouter);

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
    connectDb();
})