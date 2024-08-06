import { Router } from "express";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUserModel from "../models/Adminuser.js";
import { isAdmin } from "../middleware/verifyToken.js";
import mongoose from "mongoose";

const router = Router();

// Add User
router.post('/adduser', async (req, res) => {
    try {
        const { username, password, phonenumber } = req.body;
        const existingUser = await AdminUserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: true, message: "User Already Exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new AdminUserModel({
            username,
            password: hashedPassword,
            phonenumber
        });
        await newUser.save();
        res.status(200).send({ success: true, newUser, message: "User Registered Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AdminUserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({  message: "User Not Found" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid Password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });
        res.status(200).send({ success: true, message: "Login Successful", user, token,userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

// Logout
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: "Logout Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

// Get All Users
router.get('/getusers', async (req, res) => {
    try {
        const users = await AdminUserModel.find();
        if (!users) {
            return res.status(404).send({ error: true, message: "No Users Found" });
        }
        res.status(200).send({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

// Get User by ID
router.get('/getuser/:userId', async (req, res) => {
    try {
        const {userId }  = req.params;
        // if (!mongoose.isValidObjectId(id)) {
        //     return res.status(400).send({ message: "Invalid User ID" });
        // }
        const user = await AdminUserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        res.status(200).send({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

router.put('/update/:id' , async(req, res) => {
    try {
        const id = req.params.id;
        const { username, password, phonenumber } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ error: true, message: "Invalid User ID" });
        }        
        const UpdateUSer = await AdminUserModel.findByIdAndUpdate(id, {username, password, phonenumber}, {new:true});
        if(req.body.password) {
            const salt = 10;
            const hashedPassword = await bcryptjs.hashSync(req.body.password, salt);
            UpdateUSer.password = hashedPassword;
            await UpdateUSer.save();
        }
        if(!UpdateUSer) {
            res.status(404).send({error: false, message: "User Not Found"});
    
        }
        res.status(200).send({success: true, UpdateUSer,  message: "Details Updated Successfully"})
        
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: false, message: "Internal Server error" });
    }
    
})

export default router;
