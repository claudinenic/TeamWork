import validator from "validator";
import mongoose from "mongoose";


    const artSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    article:{
        type: String,
        required: true
    },
    authorId:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },

    
    
  

})
//let article = module.exports= mo.model('Article',artSchma);
const article = mongoose.model("Article", artSchema);
export default article;