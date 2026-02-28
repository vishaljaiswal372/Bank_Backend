import mongoose from "mongoose";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        throw new ApiError("Database Connection Failed",500,error,"/src/db/db.js");
    }
};

export default connectDB;