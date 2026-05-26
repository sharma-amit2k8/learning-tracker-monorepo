import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String

    },
     price : {
        type : Number,
        required : true
    }, 
    totalLessons : {
        type: Number,
        required: true,
        default : 0,
    },
    completedLessons : {
        type: Number,
        required: true,
        default: 0
    },
    status : {
        type: String,
        enum : ['not started','in progress','completed'],
        default: 'not started'
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        // required: true
        ref : 'User'
    }
},{
    timestamps: true
})

export const Course = mongoose.model('Courses', courseSchema)