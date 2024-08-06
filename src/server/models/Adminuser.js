import mongoose from "mongoose";

const AdminUserSchmema = new mongoose.Schema({
    
    username:{
        type: String,
        unique: true,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        require: true
    },
    customers: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'customerdetails'
    }]
})

const AdminUserModel = mongoose.model("Adminusers", AdminUserSchmema);
export default AdminUserModel;