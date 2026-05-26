import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to DB successfully')
        // check the DB connection state
        // console.log("state" ,mongoose.connection.readyState)
    } catch (e) {
        console.log({error : e.message})
    } 
}
