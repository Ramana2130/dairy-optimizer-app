import express from "express";
import ViteExpress from "vite-express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import milkRoute from "./routes/milkdetails.js"
import authRoute from "./routes/auth.js"
import { isAdmin } from "./middleware/verifyToken.js";
// import adminRoute from "./routes/adminRoutes.js"
import adminUserRoutes from './routes/adminuserRoutes.js'
import customerdetailsRoute from './routes/customerdetails.js'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const MONGO_URL = process.env.MONGO_URL;

//database connection
mongoose.connect(MONGO_URL)
.then(() => console.log('database connected Successfully'))
.catch((error) => console.log('database not connected', error))

//routes
app.use("/auth", authRoute)
app.use('/milk', milkRoute)
// app.use('/admin', isAdmin ,adminRoute)
app.use('/admin', adminUserRoutes)
app.use('/customer', customerdetailsRoute)

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
