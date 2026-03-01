import mongoose from "mongoose";
const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const ledgerSchema=new Schema({
    accountId:{
        type:ObjectId,
        ref:"account",
        required:[true,"Account ID is required"],
    },
    type:{
        type:String,
        required:[true,"Transaction Type is required"],
    },
    amount:{
        type:Number,
        required:[true,"Transaction Amount is required"],
    }
},{timestamps:true});

const LedgerModel=mongoose.model("ledger",ledgerSchema);

export default LedgerModel;