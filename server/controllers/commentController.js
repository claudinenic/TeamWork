
import Comment from '../models/commentModel';
import catchAsync from '../utils/catchAsync';


export const createComment = catchAsync(async (req,res,next)=>{

  const comment = await Comment.create(req.body);
  //const newArticle = await Article.create(req.body);

  req.requestTime  =new Date().toISOString();

  res.status(201).json({
      status:'success',
      createdOn:req.requestTime,
      data:{
        comment
      }
  })
})
 
export const getAllComment = catchAsync(async (req,res,next)=>{

  req.requestTime  =new Date().toISOString();
  
  const comments = await Comment.find();

  res.status(200).json({
    status:'success',
    data:{
        comments
    }
  })
})


export const getComment = catchAsync(async (req,res,next)=>{

  const comment= await Comment.findById(req.params.id)
  console.log(comment)
  res.status(200).json({
      status:'success',
      data:{
        comment
      }
    })
})


export const deleteComent =  catchAsync(async (req,res,next)=>{

   await Comment.findByIdAndDelete(req.params.id)

  res.status(200).json({
      status:'success',
      data:{}
    })
})

export const updateComment = catchAsync(async (req,res,next)=>{

    const comment=await Comment.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidator:true
    })
    res.status(200).json({
        success:true,
        data: comment
    })

})
