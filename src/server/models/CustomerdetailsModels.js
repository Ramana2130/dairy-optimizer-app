import mongoose from "mongoose";

const CustomerDetailsSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adminusers',  // Reference to AdminUser model
        required: true
    },
    username: {
        type: String,
    },
    phonenumber: {
        type: Number,
    },
    password: {
        type: String,
    },
    doorno: {
        type: String,
    },
    streetaddress: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    deliveryschedule: {
        type: String,
        enum: ["morning", "evening", "both"],
        default: "both"  // Default value should be a string, not an array
    },
    maxrequiredquantity: {
        type: Number,
    }
});

const CustomerDetailsModel = mongoose.model("CustomerDetails", CustomerDetailsSchema);
export default CustomerDetailsModel;
