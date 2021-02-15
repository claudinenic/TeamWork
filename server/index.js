import express from "express";
import bodyParser from "body-parser";
import patientRouter from "./routes/PatientRoute";
import UserRouter from "./routes/userRouter"
import * as globalErrorHandling from "./controllers/ErrorController"
import AppError  from "./utils/appError"

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{res.status(200).send({
    status:200, 
    message:'welcome to patiente registration',
})
})
app.use((req, res, next) => {
req.requestTime = new Date().toISOString();
next()
})
console.log(app.get('env'))

app.use("/api/v3/patient",patientRouter)
app.use("/api/v3/User",UserRouter)
app.all('*', (req,res,next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`

    // })
    // const err = new Error( `Can't find ${req.originalUrl} on this server`)
    // err.status = 'fail'
    // err.statusCode= 404
    console.error(stack)
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandling. globalErrorHandling)
export default app;