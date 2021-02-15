import express from "express";
import * as articleControl from "../controllers/articleController";
import article from "../models/Article";

const articleRoute = express.Router()

articleRoute.route("/")
                   .post(articleControl.createArticle)
                   .get(articleControl.getAllArticles)
                   

articleRoute.route('/:id')
                   .delete(articleControl.deleteArticle)
                   .patch(articleControl.updateArticle)
                   .get(articleControl.getArticle)


export default articleRoute;