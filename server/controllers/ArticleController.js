import { now } from "mongoose";
import article from "../models/Article";
import catchAsync from "../utils/catchAsync"
import Comment from '../models/Comment';

export const createArticle = catchAsync(async (req,res,next)=>{
    let articleInfo= {};
    articleInfo.title=req.body.title;
    articleInfo.article=req.body.article;
    articleInfo.authorId=req.user.id;
    articleInfo.createdAt=new Date().toISOString();
    const name=req.user.firstName+" "+req.user.lastName
    articleInfo.author=name;
    
  
    const newArticle = await article.create(articleInfo);
    res.status(201).json({
        status:"success",
        newArticle
            })
        })

        export const getArticle = catchAsync(async(req,res,next)=>{
            const comment = await Comment.find({articleId:req.params.id})
            const articleInfo = await article.findById(req.params.id)
                    res.status(200).json({
                        status : 'success',
                        data: {
                            articleInfo ,
                            comment
                        }
                    
                })
            })
    
    //Update controll function
    export const updateArticle = catchAsync(async (req,res,next)=>{
        let articleInfo= {};
        articleInfo.title=req.body.title;
        articleInfo.article=req.body.article;
        let query = {_id:req.params.id}
     
        const updateArticle = await article.updateOne(query, articleInfo)
                res.status(200).json({
                    status:"Updated succeed",  
                    articleInfo
                })  
            })
      //Delete controll function
      export const deleteArticle = catchAsync(async (req, res, next) => {
    
        let query = {_id:req.params.id}
    
        const articleInfo= await article.deleteOne(query)
            res.send('Deleted Successfully')      
        
    })
    
          //Get All controll function
    export const getAllArticles = catchAsync(async (req,res,next) => {
       
        const allArticle = await article.find({})
            res.send(allArticle)
        })