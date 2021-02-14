import validator from "validator";
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    patientName:{
        type: String,
        required: [true, " patient name is required"]
    },
    phone:{
        type: String,
    },
    home:{
        type:String
    },
    email:{
        type:String,
        validate:[validator.isEmail,"please provide"]
    }
});

const PatientInfos = mongoose.model("patientInfos", patientSchema);
export default PatientInfos;