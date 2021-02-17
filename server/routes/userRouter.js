
import express, { Router } from "express";
import * as patientControl from "../controllers/PatientControllers";
import * as userControl from "../controllers/UserController";
import * as AuthController from "../controllers/AuthController"
import PatientInfos from "../models/Patient";

const userRouter = express.Router()
userRouter.post('/login', AuthController.login)
userRouter.post('/signup', AuthController.signup)

userRouter.route("/")
                   
                   .post(userControl.createUser)
                   .get(userControl.getAlluser)  

userRouter.route('/:id')
                   .delete(userControl.deleteUser)
                   .patch(userControl.updateUser)
                   .get(userControl.getUser)
export default userRouter;
