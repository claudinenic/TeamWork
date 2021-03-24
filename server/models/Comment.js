import mongoose from 'mongoose'


 const commentSchemma = new mongoose.Schema({

    comment:{
        type:String,
        maxlength:100,
        required:[true,'Please enter Comment']
    },
    createdAt:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    authorId:{
        type:String,
  
    },
    articleId:{
        type:String,
        required:[true,'Please enter ArticleID']
    }


})


const Comment = mongoose.model('Comment',commentSchemma);

export default Comment