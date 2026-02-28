import app from "./app.js";
import connectDB from "./db/db.js";
import ApiError from "./utils/ApiError.js";

connectDB().then(
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    })
).catch((err)=>{
    throw new ApiError("Database Connection Failed",500,err,"/src/index.js");
});