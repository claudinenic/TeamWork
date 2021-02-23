import User from "../models/User";

import catchAsync from "../utils/catchAsync"

export const createUser = catchAsync(async (req,res,next)=>{

    const newUser = await User.create(req.body);//inpostman
    res.status(201).json({
        status:"success",
        newUser
            })
        })

    
//Get indv controll funct ion

    export const getUser = catchAsync(async(req,res,next)=>{
        const user= await User.findById(req.params.id)
                res.status(200).json({
                   status:"success",
                   user
                
            })
        })

//Update controll function
export const updateUser= catchAsync(async (req,res,next)=>{
    let user= {};
   user.firstName=req.body.firstName;

   user.email=req.body.email;
   user.password=req.body.password;
   user.passwordConfirm=req.body.passwordConfirm;
    let query = {_id:req.params.id}
 
    const updateUser = await User.updateOne(query, user)
            res.status(200).json({
                status:"Updated success",   
          })  
       })
  //Delete controll function
  export const deleteUser = catchAsync(async (req, res, next) => {

     let query = {_id:req.params.id}
  const user = await User.deleteOne(query)
        res.send('Deleted Successfully')      
    
})

      //Get All controll function
export const getAlluser = catchAsync(async (req,res,next) => {
   
    const alluser = await User.find({})
        res.send(alluser)
     })
