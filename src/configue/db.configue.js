const mongoose=require("mongoose")

const MONGODB_URL=process.env.MONGODB_URL


const connectDb=async()=>{
    try {
        await mongoose.connect(MONGODB_URL)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports=connectDb
