import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
import bcrypt from "bcryptjs";

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please fill a valid email address"],
    },
    refreshToken:{
        type:String,
    }
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const hashPassword=await bcrypt.hash(this.password,10);
    this.password=hashPassword;
    next();
});

userSchema.methods.GenerateRefreshToken=async function(){
    const refreshToken=jwt.sign({_id:this._id},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
    this.refreshToken=refreshToken;
    return refreshToken;
};

userSchema.methods.ComparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const UserModel=mongoose.model("user",userSchema);

export default UserModel;

