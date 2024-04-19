import mongoose from "mongoose";

export default async function connectToMongoDB(){

    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log("Connected to MongoDB");
    }

    catch(error){
        console.log(error);
    }
}