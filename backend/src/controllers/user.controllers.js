//use this file to store the logic for the user routes. 
// This file will be imported in the index.js file and used as a middleware for the user routes.
import { User } from "../models/users.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req,res) => {
    try {
    const {name , email, password } = req.body
    
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })

        if(!email || !email.includes('@')){
            throw new Error('Email format not valid')
            // return res.status(400).json ({
            //     Error :'Email format not valid'
            // })
        }

        //check if user alreay exists
        const existingUser = await User.findOne({email})

        if(existingUser){
            // throw new Error('Email already exists')
            return res.status(200).json({message : 'Email already exists'})
        }

        const saveduser = await user.save()

        res.status(201).json({
            message : 'User registered successfully',
            user: saveduser
        })
    } catch(e) {
        res.status(400).send({error : e.message});
        }
}

export const login = async (req,res) => {
    try{
        const password = req.body.password
        const email = req.body.email

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message : "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"})
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY)
        res.status(200).json({message:"Login Successful",token,name : user.name})

    } catch(e) {
        res.status(400).json({message:"Login failed",error: e.message})

    }

}

export const getUserProfile = async (req, res) =>{
    try{
    res.status(200).json({
        message : 'User profile fetched',
        user : req.user})
    } catch(e) {
        res.status(400).json({error: e.message})    
    }
}

export const getUserDashboard = async (req, res) => {
    res.status(200).json({
        "message": "Welcome to dashboard",
        "userId": req.user._id
    })
}