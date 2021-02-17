import express from "express";
import * as articleControl from "../controllers/articleController";
import article from "../models/Article";
import * as authControl from "../controllers/AuthController"


const articleRoute = express.Router()

articleRoute.route("/")
                   .post(articleControl.createArticle)
                   .get(authControl.protect, articleControl.getAllArticles)
                

articleRoute.route('/:id')
                   .delete(articleControl.deleteArticle)
                   .patch(articleControl.updateArticle)
                   .get(articleControl.getArticle)


export default articleRoute;