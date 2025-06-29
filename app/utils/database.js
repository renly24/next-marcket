import mongoose from "mongoose"

const connectDB = async() => {
    try{
        const mongoUri = process.env.MONGODB_URI 
        await mongoose.connect(mongoUri)
        console.log("Success: Connected to MongoDB (test database)")
    }catch(error){
        console.log("Failure: Unconnected to MongoDB", error.message)
        throw new Error(`データベース接続エラー: ${error.message}`)
    }
}

export default connectDB