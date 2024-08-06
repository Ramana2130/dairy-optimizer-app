import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import AdminUserModel from "../models/Adminuser.js";

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).send({ message: 'Unauthorized: No token provided' });
        }
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await UserModel.findById(decode.userId);
        const adminuser = await AdminUserModel.findById(decode.userId)
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }      

        // Attach user object to request for further use in routes
        req.user = user;
        req.adminuser = adminuser;
        next();
    } catch (error) {
        console.error('isAdmin middleware error:', error);
        return res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
}

export {isAdmin};