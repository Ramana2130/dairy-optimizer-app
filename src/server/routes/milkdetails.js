import { Router } from "express";
import MilkModel from "../models/MilkModel.js";
import CustomerDetailsModel from "../models/CustomerdetailsModels.js";
import AdminUserModel from "../models/Adminuser.js";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const {
      adminId,
      customerId,
      username,
      address,
      deliveryschedule,
      quantity,
      price,
    } = req.body;
    if (!adminId || !customerId) {
      return res
        .status(400)
        .send({ error: true, message: "adminId and customerId are required" });
    }
    const customer = await CustomerDetailsModel.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .send({ error: true, message: "Customer not found" });
    }
    const newMilkDetails = new MilkModel({
      admin: adminId, // Associate milk order with the admin
      customer: customerId,
      username,
      address,
      deliveryschedule,
      quantity,
      price,
    });

    // Save the milk order to the database
    await newMilkDetails.save();

    res
      .status(200)
      .send({
        success: true,
        newMilkDetails,
        message: "Milk added successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
});
//read

router.get("/get", async (req, res) => {
  try {
    const milk = await MilkModel.find();
    if (!milk) {
      res.status(404).send({ error: false, message: "Milkdata Not Found" });
    }
    res.status(200).send({ success: true, milk });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal Server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const milk = await MilkModel.findById({ _id: id });
    if (!milk) {
      res.status(404).send({ error: false, message: "Milkdata Not Found" });
    }
    res.status(200).send({ success: true, milk });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: true, message: "Internal Server error" });
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const UpdateUser = await MilkModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!UpdateUser) {
      res.status(404).send({ error: false, message: "Milkdata Not Found" });
    }
    res
      .status(200)
      .send({
        success: true,
        UpdateUser,
        message: "Milkdata Updated Successfully",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: false, message: "Internal Server error" });
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const DeleteUserId = req.params.id;
    const deleteuserId = await MilkModel.findByIdAndDelete(DeleteUserId);
    if (!deleteuserId) {
      res.status(404).send({ error: false, message: "Milkdata Not Found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Milkdata Deleted Successfully" });
  } catch (error) {}
});

// Route to fetch milk details for a specific admin
router.get("/:adminId/milkdetails", async (req, res) => {
  const { adminId } = req.params;
  try {
    const milkDetails = await MilkModel.find({ admin: adminId });
    res.json({ milkDetails });
  } catch (error) {
    console.error("Error fetching milk details:", error);
    res.status(500).json({ error: "Error fetching milk details" });
  }
});

export default router;
