import { Router } from "express";
import MilkModel from "../models/MilkModel.js";
import CustomerDetailsModel from "../models/CustomerdetailsModels.js";
import AdminUserModel from "../models/Adminuser.js";

const router = Router()

//create
router.post('/add', async (req, res) => {
    try {
        const { adminId, customerId, username, address, deliveryschedule, quantity, price } = req.body;

        // Check if both adminId and customerId are provided
        if (!adminId || !customerId) {
            return res.status(400).send({ error: true, message: "adminId and customerId are required" });
        }

        // Fetch the customer from the database
        const customer = await CustomerDetailsModel.findById(customerId);

        // Check if the customer exists
        if (!customer) {
            return res.status(404).send({ error: true, message: "Customer not found" });
        }

        // Create a new milk order
        const newMilkDetails = new MilkModel({
            admin: adminId, // Associate milk order with the admin
            customer: customerId,
            username,
            address,
            deliveryschedule,
            quantity,
            price
        });

        // Save the milk order to the database
        await newMilkDetails.save();

        res.status(200).send({ success: true, newMilkDetails, message: "Milk added successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});
//read

router.get('/get' ,async(req, res) => {
    try {
        const milk = await MilkModel.find();
        if(!milk) {
            res.status(404).send({error: false, message: "Milkdata Not Found"})
        }
        res.status(200).send({success: true, milk})
    } catch (error) {
        console.log(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal Server error" });
    }
})

router.get('/get/:id' ,async(req, res) => {
    const id = req.params.id;
    try {
        const milk = await MilkModel.findById({_id: id});
        if(!milk) {
            res.status(404).send({error: false, message: "Milkdata Not Found"})
        }
        res.status(200).send({success: true, milk})
    } catch (error) {
        console.log(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal Server error" });
    }
})


//update
router.put('/update/:id', async(req, res) => {
    try {
        const userId = req.params.id
        const UpdateUser = await MilkModel.findByIdAndUpdate(userId, req.body,{new: true});
        if(!UpdateUser) {
            res.status(404).send({error: false, message: "Milkdata Not Found"});
        }
        res.status(200).send({success: true,UpdateUser,  message: "Milkdata Updated Successfully"})
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: false, message: "Internal Server error" });
    }
})

//delete
router.delete('/delete/:id', async(req, res) => {
    try {
        const DeleteUserId = req.params.id;
        const deleteuserId = await MilkModel.findByIdAndDelete(DeleteUserId);
        if(!deleteuserId) {
            res.status(404).send({error: false, message :"Milkdata Not Found"});
        }
        res.status(200).send({success: true, message: "Milkdata Deleted Successfully"})
    } catch (error) {
        
    }
})

// Route to fetch milk details for a specific admin
router.get("/:adminId/milkdetails", async (req, res) => {
    const { adminId } = req.params;

    try {
        // Find all milk details associated with customers of the specified admin
        const milkDetails = await MilkModel.find({ admin: adminId })

        res.json({ milkDetails });
    } catch (error) {
        console.error("Error fetching milk details:", error);
        res.status(500).json({ error: "Error fetching milk details" });
    }
});
// Adjust the import path as needed
// router.get("/:customerId/:userId/milkdetails", async (req, res) => {
//   const { customerId, userId } = req.params;

//   try {
//     // Fetch all milk details for the customer
//     const milkData = await MilkModel.find({ customer: customerId, admin: userId });

//     // Check if any milk data was found
//     if (milkData.length === 0) {
//       return res
//         .status(404)
//         .send({
//           error: true,
//           message: "No milk details found for the provided customer ID",
//         });
//     }

//     // Fetch the admin details
//     const adminData = await AdminUserModel.findById(userId).select(
//       "-password"
//     );

//     // Check if admin data was found
//     if (!adminData) {
//       return res.status(404).send({ error: true, message: "Admin not found" });
//     }

//     // Respond with both milkData and adminData
//     return res.status(200).send({
//       success: true,
//       milkData,
//       adminData,
//     });
//   } catch (error) {
//     // Log the error for debugging and respond with a 500 status code
//     console.error(error);
//     return res
//       .status(500)
//       .send({ error: true, message: "Internal server error" });
//   }
// });

export default router;


