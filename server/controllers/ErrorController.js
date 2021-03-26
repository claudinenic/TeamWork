const sendErrorForDev = (err,res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}
const sendErrorForProd = (err,res) => {
    if (err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message:err.message
        })
    //programming error and other Unkown error: We don't want to leak error details
    }else{
        //1) Log error
        console.error('ERROR++++++++++++', err)
        //2) Send generic message
        res.status(500).json({
            status:'error',
            message:'Somethng went very wrong!'

        })
    }
  }

export const  globalErrorHandling = (err,req,res,next) => { 
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV==='development'){
        sendErrorForDev(err, res)
    }else if(process.env.NODE_ENV==='production'){
        sendErrorForProd(err,res)
    }    
}