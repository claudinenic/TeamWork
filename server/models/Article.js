import validator from "validator";
//import mo from "mongoose";
import mongoose from "mongoose";

// let mo = require('mongoose');
// let artSchma =mo.Schema({    
//    id:{
//         type: String,
//         required: false
//     },  

//const artSchema = new mo.Schema({
    const artSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    
    Body:{
        type:String,
        required:true,
       
    },
    author:{
        type: String,
        required:true
    }

})
//let article = module.exports= mo.model('Article',artSchma);
const article = mongoose.model("Article", artSchema);
export default article;