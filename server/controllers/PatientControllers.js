import patientInfos from "../models/Patient";
import catchAsync from "../utils/catchAsync"

export const createPatient = catchAsync(async (req,res,next)=>{

    const newPatient = await patientInfos.create(req.body);
    res.status(201).json({
        status:"success",
        newPatient
            })
        })

    
//Get indv controll funct ion

    export const getPatient = catchAsync(async(req,res,next)=>{
        const patient = await patientInfos.findById(req.params.id)
                res.status(200).json({
                   status:"success",
                   patient
                
            })
        })

//Update controll function
export const updatePatient = catchAsync(async (req,res,next)=>{
    let patient= {};
    patient.patientName=req.body.patientName;
    patient.phone=req.body.phone;
    patient.home=req.body.home;
    patient.email=req.body.email;
    let query = {_id:req.params.id}
 
    const updatePatient = await patientInfos.updateOne(query, patient)
            res.status(200).json({
                status:"Updated success",   
            })  
        })
  //Delete controll function
  export const deletePatient = catchAsync(async (req, res, next) => {

    let query = {_id:req.params.id}

    const patient = await patientInfos.deleteOne(query)
        res.send('Deleted Successfully')      
    
})

      //Get All controll function
export const getAllPatient = catchAsync(async (req,res,next) => {
   
    const allPatient = await patientInfos.find({})
        res.send(allPatient)
    })
