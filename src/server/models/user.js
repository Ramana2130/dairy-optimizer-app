import mongoose from "mongoose";

const UserSchmema = new mongoose.Schema({
    
    username:{
        type: String,
        unique: true,
        required : true
    },
    password:{
        type: String,
        required: true
    }, 
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    }
})

const UserModel = mongoose.model("users", UserSchmema);
export default UserModel;