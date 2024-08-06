import { Router } from "express";
import UserModel from "../models/user.js";
import bcryptjs from 'bcrypt';
import jwt from 'jsonwebtoken'
// import CustomerDetailsModel from "../models/CustomerdetailsModels.js";

const router = Router();

router.post('/adduser', async (req, res) => {
    try {
        const {username, password} = req.body
        const Username = await UserModel.findOne({username})
        if(Username) {
            return res.status(400).send({error: false, message: "User Already Exist"});
        }
        const hashpassword = await bcryptjs.hashSync(password, 10)
        const newUserDetails = new UserModel({
            username, password:hashpassword
        })
        await newUserDetails.save();
        res.status(200).send({success: true, newUserDetails,  message: "User Registerd Successfully"});        
    } catch (error) {
        console.log(error);
        return  res.status(500).send({error: true, message: "Internal Server error"})
    }
})


//login
router.post('/login', async(req, res) => {
    try {
        const {username, password} = req.body
        const user = await UserModel.findOne({username});
        if(!user) {
            res.status(404).send({success: false, message: "User Not Found"})
        }
        const isPasswordvalid = await bcryptjs.compare(password, user.password);
        if(!isPasswordvalid) {
            res.status(404).send({success:false, message: "Invalid password"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_TOKEN,{ expiresIn: '1d' })
        res.cookie('token', token,{
            httpOnly: true,
            secure: false,
            maxAge:3600000
        })
        res.status(200).send({success: true, message: "Login Successfully", user, customerId:user._id, token});
    } catch (error) {
        console.log(error);
        return  res.status(500).send({error: true, message: "Internal Server error"})
    }
})
//logout
router.post('/logout', async(req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({message: "Logout Sucessfully"})        
    } catch (error) {
        console.log(error);
        return  res.status(500).send({error: true, message: "Internal Server error"})
    }
})
export default router