import mongoose from 'mongoose'


 const commentSchemma = new mongoose.Schema({

    comment:{
        type:String,
        maxlength:100
    },
    articleID:{
        type:String
    }

})


const Comment = mongoose.model('Comment',commentSchemma);

export default Comment