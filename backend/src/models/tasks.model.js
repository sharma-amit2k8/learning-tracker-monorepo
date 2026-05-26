import mongoose from "mongoose";
import { User } from "./users.model.js";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    }, completed :{
        type : Boolean,
        default : false
    }, createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: User
    }
},{
    timestamps: true
})

export const Task = mongoose.model('Task', taskSchema)