import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema =  new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
    },
    password: {
        type : String,
        required: true,
        minlength : 6,
    }
},{
    timestamps: true
})

userSchema.methods.toJSON = function(next) {
    const user = this.toObject()

    delete user.password
    delete user._id
    delete user.__v
    return user
}

userSchema.pre('save', async function () {
    //if password is not modified then dont hash it again
    if(!this.isModified('password')){
        return 
    }

    this.password =  await bcrypt.hash(this.password,8)
})

export const User = mongoose.model('User', userSchema)