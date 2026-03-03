import mongoose from "mongoose";
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const transactionSchema=new Schema({
    from:{
        type:ObjectId,
        ref:"account",
        required:[true,"From Account ID is required"],
    },
    to:{
        type:ObjectId,
        ref:"account",
        required:[true,"To Account ID is required"],
    },
    UniqueIdentifier:{
        type:String,
        required:[true,"Transaction Unique Identifier is required"],
    },
    amount:{
        type:Number,
        required:[true,"Transaction Amount is required"],
    },
    CompletionStatus:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

const TransactionModel=mongoose.model("transaction",transactionSchema);

export default TransactionModel;