import {v2 as cloudinary} from 'cloudinary';
import ApiError from './ApiError.js';
import fs from 'fs';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary=async(LocalFilePath)=>{
    try {
        if(!LocalFilePath){
            throw new ApiError("No file provided",500,null,"/src/utils/Cloudinary.js");
        }
        const response=await cloudinary.uploader.upload(LocalFilePath);
        console.log(response.url);
        fs.unlinkSync(LocalFilePath);
        return response.url;
    } catch (err) {
        fs.unlinkSync(LocalFilePath);
        throw new ApiError("Cloudinary Upload Failed",500,err,"/src/utils/Cloudinary.js");
    }
}

export default uploadToCloudinary;