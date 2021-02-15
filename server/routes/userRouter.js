import express from "express";
import * as userControl from "../controllers/UserController";
import User from "../models/User";

const UserRouter = express.Router()

UserRouter.route("/")
                   .post(userControl.createUser)
                     .get(userControl.getAlluser)             

UserRouter.route('/:id')
                   
                   .get(userControl.getUser)
                   .patch(userControl.updateUser)
                   .delete(userControl.deleteUser)

export default UserRouter;