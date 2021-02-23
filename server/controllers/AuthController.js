import {promisify}from 'util'
import User from "../models/User"
import catchAsync from "../utils/catchAsync"
import jwt from 'jsonwebtoken'
import AppError from '../utils/appError'

const signToken = id => {
   return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN  
      })
}


export const signup = catchAsync(async(req, res, next) =>{
console.log(req.requestTime )
    const newUser =await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        gender: req.body.gender,
        jobRole: req.body.jobRole,
        department: req.body.department,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt:req.requestTime 
    })
    const token = signToken(newUser._id)
    
    res.status(201).json({
        status : 'success',
        message : 'User created successfully',
        data: {
           user: newUser,
           token: token
        }

    }) 
})

export const login = catchAsync(async (req,res,next) => {
    const {email,password} = req.body
     //1)check if email &pwd exist
    if(!email||!password){
         return next(new AppError('Please provide email and password!',400))
    }
    //2)check if the user exist & password is correct
    const user = await User.findOne({email}).select('+password')
      if(!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('Incorrect email or password',401))
      }
    //3)if everything ok , send token to nclient 
    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token
    })

})
export const protect = catchAsync(async (req, res, next)=> {
    //1 Getting tocken and check its there
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        token =req.headers.authorization.split(' ')[1]
    }
    // console.log(token)
    if(!token){ 
        return next(new AppError('You are not logged in! Please login to get access', 401))
    } 

    // 2. verificatoin token

   const decoded= await  promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(decoded)
    // 3.check if user still exists
    const freshUser = await User.findById(decoded.id)
    if(!freshUser){
        return next(new AppError('The token belonging to this use does no long exist.', 401))
    }
    // 4.check if user changed password after  the token was issued
    if(freshUser.changesPassordAfter(decoded.iat)){
        return next(
            new AppError('user recently changed password! Please login again.', 404)
        )
    }
    //5Grant Access to protected route
    req.user = freshUser

    next();
})                   