import { Router } from "express";
import CustomerDetailsModel from "../models/CustomerdetailsModels.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import AdminUserModel from "../models/Adminuser.js";
import MilkModel from "../models/MilkModel.js";

const router = Router();
router.post('/addcustomer', async (req, res) => {
    try {
        const {adminId, username, phonenumber, password, doorno, streetaddress, city, pincode, deliveryschedule, maxrequiredquantity } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).send({ error: true, message: "Username and password are required" });
        }
         // Optional: Additional validation for other fields
         if (!phonenumber || !doorno || !streetaddress || !city || !pincode || !deliveryschedule || !maxrequiredquantity) {
            return res.status(400).send({ error: true, message: "All fields are required" });
        }

      

        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10); // Use synchronous version of genSalt
        if (!salt) {
            return res.status(500).send({ error: true, message: "Failed to generate salt" });
        }

        const hashedPassword = bcrypt.hashSync(password, salt); // Use synchronous version of hash
        if (!hashedPassword) {
            return res.status(500).send({ error: true, message: "Failed to hash password" });
        }

        // Create and save the new customer details
        const newCustomerDetails = new CustomerDetailsModel({
            admin: adminId,
            username,
            phonenumber,
            password: hashedPassword,
            doorno,
            streetaddress,
            city,
            pincode,
            deliveryschedule,
            maxrequiredquantity
        }); 

        await newCustomerDetails.save();
        res.status(200).send({ message: "Customer added successfully" });
    } catch (error) {
        console.error("Error adding customer:", error); // Improved error logging
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});


//getusers
router.get('/getcustomers', async(req, res) => {
    try {
       const customers = await CustomerDetailsModel.find({});
    res.status(200).send({ customers });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
})

//updateUser 
router.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        // Find the user by ID and update it
        const updatedUser = await CustomerDetailsModel.findByIdAndUpdate(
            userId,
            {
                username: req.body.username,
                phonenumber: req.body.phonenumber,
                doorno: req.body.doorno,
                streetaddress: req.body.streetaddress,
                city: req.body.city,
                pincode: req.body.pincode,
                deliveryschedule: req.body.deliveryschedule,
                maxrequiredquantity: req.body.maxrequiredquantity,
            },
            { new: true } // Return the updated document
        );   
        if (req.body.password) {
            // Encrypt the new password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds);
            updatedUser.password = hashedPassword;
            await updatedUser.save();
        }    

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).send({ error: true, message: 'Customer Not Found' });
        }

        // Send a success response with the updated user details
        res.status(200).send({ success: true, updatedUser,message: 'Customer Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
}); 

//login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure that `findOne` returns a Promise and is awaited properly
        const user = await CustomerDetailsModel.findOne({ username });
        
        if (!user) {
            return res.status(404).send({ success: false, message: "User Not Found" });
        }

        // Ensure that `bcrypt.compare` returns a Promise and is awaited properly
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({success: false, message: "Invalid password" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: '1d' });

        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });

        // Send success response
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user,
            customerId: user._id,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal Server error" });
    }
});

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

// Get customer details by user ID
router.get('/getcustomer/:_id', async (req, res) => {
    try {
        const _id = req.params._id;

        const customer = await CustomerDetailsModel.findOne({_id :_id});

        if (!customer) {
            return res.status(404).send({error: true, message: "Customer not found"});
        }

        res.status(200).send({success: true, customer});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: true, message: "Internal Server Error"});
    }
});

router.delete('/delete/:id' ,async(req, res) => {
    try {
        const userId = req.params.id;
        const deleteCustomer = await CustomerDetailsModel.findByIdAndDelete(userId);
        if(!deleteCustomer) {
            res.status(404).send({message: "Customer not found"})
        }
        res.status(200).send({message: "Customer deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"})

    }
})

router.get('/:adminId/customers', async (req, res) => {
    const {adminId}= req.params;

    try {
        // Find customers belonging to the specified admin
        const customers = await CustomerDetailsModel.find({ admin: adminId }).select("-password")

        res.status(200).json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get customer details, admin details, and milk details
router.get('/:customerId/details', async (req, res) => {
    const { customerId } = req.params;  
    try { 
      // Fetch customer details
      const customer = await CustomerDetailsModel.findById(customerId).exec();
      if (!customer) {
        return res.status(404).json({
          error: true,
          message: 'Customer not found',
        });
      }
  
      // Fetch associated admin details
      const admin = await AdminUserModel.findById(customer.admin).select('-password').exec(); // Assuming 'admin' is a reference in CustomerModel
      if (!admin) {
        return res.status(404).json({
          error: true,
          message: 'Admin not found',
        });
      }
  
      // Fetch all milk details for the customer
      const milkDetails = await MilkModel.find({ customer: customerId }).exec();
  
      // Respond with customer details, admin details, and milk details
      res.status(200).json({
        success: true,
        customer,
        admin,
        milkDetails,
      });
    } catch (error) {
      console.error('Error fetching details:', error);
      res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }
  });

export default router
