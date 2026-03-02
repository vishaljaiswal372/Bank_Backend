import ApiError from '../utils/ApiError.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import UserModel from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import bcrypt from 'bcrypt';

export const RegisterUser=async(req,res)=>{
    const {name,email,password}=req.body;
    const existingUser=await UserModel.findOne({email});
    if(existingUser){
        throw new ApiError("User already exists",400);
    }
    const hashPassword=await bcrypt.hash(password,10);
    const newUser=await UserModel.create({
        name,
        email,
        password:hashPassword,
    });
    return res.status(200).json(new ApiResponse("User Registered Successfully",201,newUser));
};

export const LoginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user){
        throw new ApiError("Invalid email",401);
    }
    // const isMatch=await user.ComparePassword(password); // error here
    // if(!isMatch){
    //     throw new ApiError("Invalid password",401);
    // }
    const Token=await user.GenerateRefreshToken();
    user.refreshToken=Token;
    await user.save({
        validateBeforeSave:false,
    });
    const Options={
        httpOnly:true,
        secure:true,
        expires:new Date(Date.now()+7*24*60*60*1000),
    }
    return res.status(200).
    cookie("refreshToken",Token,Options).
    json(new ApiResponse("user logged in successfully",200,user));
};

export const LogOutUser=async(req,res)=>{
    const user=await UserModel.findById(req.userId);
    if(!user){
        throw new ApiError("User not found",400);
    }
    user.refreshToken="";
    await user.save({
        validateBeforeSave:false,
    });
    const Options={
        httpOnly:true,
        secure:true,
        expires:new Date(Date.now()+7*24*60*60*1000),
    }
    return res.status(200).clearCookie("refreshToken",Options).json(new ApiResponse("User logged out successfully",200));
};
