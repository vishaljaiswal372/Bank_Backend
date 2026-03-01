import mongoose from "mongoose";
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const accountSchema=new Schema({
    userId:{
        type:ObjectId,
        ref:"user",
        required:[true,"User ID is required"],
    },
    name:{
        type:String,
        required:[true,"Account Name is required"],
        trim:true,
        lowercase:true,
    },
    signature:{
        type:String,
        required:[true,"Account Signature is required"],
    },
    photo:{
        type:String,
        required:[true,"Account Photo is required"],
    },
    UniqueIdNumber:{
        type:String,
        required:[true,"Account Unique ID Number is required"],
        minlength:[16,"Unique ID Number must be at least 16 characters"],
    }
},{timestamps:true});

const AccountModel=mongoose.model("account",accountSchema);

export default AccountModel;