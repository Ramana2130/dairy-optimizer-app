import mongoose from "mongoose";

const MilkDetailsSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adminusers'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerDetails'
    },
    username: {
        type: String
    },
    address: {
        type: String
    },
    deliveryschedule: {
        type: String
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    }
}, { timestamps: true });

const MilkModel = mongoose.model("MilkDetails", MilkDetailsSchema);
export default MilkModel;
