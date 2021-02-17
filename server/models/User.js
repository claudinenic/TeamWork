import validator from "validator"
import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const UserSchema =new mongoose.Schema({
    firstName:{
        type: String,
        required: [true,'Please enter first name']
    },
    lastName:{
        type: String,
        required: [true,'Please enter last name']
    },
    phone: {
        type: String,
        required: [true,'Please enter phone']
    },
    gender: {
        type: String,
        required: [true,'Please enter gender']
    },
    jobRole: {
        type: String,
        required: [true,'Please enter job role']
    },
    department: {
        type: String,
        required: [true,'Please enter department']
    },

    address: {
        type: String,
        required: [true,'Please enter address']
    },
    email:{
        type: String,
        required: [true,'Please enter email'],
        unique: true,
        lowercase:true,
        validator: [validator.isEmail,"Please provide a valid email"]
    },
   
    password: {
        type: String,
        required:  [true,'Please enter password'],
        minlength: 8,
        select:false
    },
    passwordConfirm: {
        type: String,
        required: [true,'Re-type  password'],
        validate: {
            //this work on create

            validator: function(el){
                return el === this.password
            },
        message: 'password not match'
        }
    }

}); 
UserSchema.pre('save',async function(next){
    //Only run this if password was actualy modified
    if(!this.isModified("password")) return next();
    
    //hash password with cost 12
    this.password= await bcrypt.hash(this.password, 12)
    //Delete password confirm
    this.passwordConfirm =undefined
    next()

})
UserSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User', UserSchema)
export default User;

