import AccountModel from "../models/Account.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadToCloudinary from "../utils/Cloudinary.js";
import TransactionModel from "../models/transaction.model.js";
import LedgerModel from "../models/ledger.model.js";


export const createAccount=async(req,res)=>{
    const {userId,name,password,UID}=req.body;
    if(!userId){
        throw new ApiError("User ID is required",400,null,"/src/controllers/account.controller.js createAccount end point");
    }
    if(!name){
        throw new ApiError("Account Name is required",400,null,"/src/controllers/account.controller.js createAccount end point");
    }
    if(!password){
        throw new ApiError("Account Password is required",400,null,"/src/controllers/account.controller.js createAccount end point");
    }
    if(!UID){
        throw new ApiError("Account Unique ID Number is required",400,null,"/src/controllers/account.controller.js createAccount end point");
    }
    const existingAccount=await AccountModel.findOne({UID});
    if(existingAccount){
        throw new ApiError("Account with this Unique ID Number already exists",400,null,"/src/controllers/account.controller.js createAccount end point");
    }
    const signatureLocalFilePath=req.files?.signature[0]?.path;
    if(!signatureLocalFilePath){
        throw new ApiError("Account Signature is required",400,null,"/src/controllers/account.controller.js createAccount end point");
    }

    const photoLocalFilePath=req.files?.photo[0]?.path;

    if(!photoLocalFilePath){
        throw new ApiError("Account Photo is required",400,null,"/src/controllers/account.controller.js createAccount end point");
    }

    const signatureUrl=await uploadToCloudinary(signatureLocalFilePath);
    if(!signatureUrl){
        throw new ApiError("Failed to upload signature to Cloudinary",500,null,"/src/controllers/account.controller.js createAccount end point");
    }

    const photoUrl=await uploadToCloudinary(photoLocalFilePath);
    if(!photoUrl){
        throw new ApiError("Failed to upload photo to Cloudinary",500,null,"/src/controllers/account.controller.js createAccount end point");
    }

    const account=await AccountModel.create({
        userId,
        name,
        password,
        UID,
        signature:signatureUrl,
        photo:photoUrl,
    });
    if(!account){
        throw new ApiError("Failed to create account",500,null,"/src/controllers/account.controller.js createAccount end point");
    }
    return res.status(201).json(new ApiResponse("Account created successfully",201,account));
};

export const getAccountDetails=async(req,res)=>{
    const userId=req.userId;
    if(!userId){
        throw new ApiError("User ID is required",400,null,"/src/controllers/account.controller.js getAccountDetails end point");
    }
    const account=await AccountModel.findOne({userId});
    if(!account){
        throw new ApiError("Account not found for this user",404,null,"/src/controllers/account.controller.js getAccountDetails end point");
    }
    return res.status(200).json(new ApiResponse("Account details retrieved successfully",200,account));
};

export const transactionAmount=async(req,res)=>{
    const {from,to,amount,UniqueIdentifier}=req.body;
    if(!from){
        throw new ApiError("Sender Account ID is required",400,null,"/src/controllers/account.controller.js transactionAmount end point");
    }
    if(!to){
        throw new ApiError("Receiver Account ID is required",400,null,"/src/controllers/account.controller.js transactionAmount end point");
    }
    if(!amount){
        throw new ApiError("Transaction Amount is required",400,null,"/src/controllers/account.controller.js transactionAmount end point");
    }
    
};