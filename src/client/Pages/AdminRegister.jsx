import React, { useState } from "react";
import cow from "../assets/cow.jpg";
import grey from "../assets/grey.png";
import pink from "../assets/pink.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circle2.png";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from '../assets/logo.svg'
import Navbar from "../Components/Navbar";
import Tab from "../Components/Tab";
import MobileAdminsignup from "./MobileUi/MobileAdminSignup";

const AdminRegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin/adduser", {
        username,
        password,
        phonenumber
      });

      console.log(response.data); // Log the response data for debugging

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/adminlogin");
      } else {
        toast.error('Unexpected response status: ' + response.data.message);
      }
    } catch (error) {
      console.error('Axios error:', error);
      if (error.response && error.response.status === 400) {
        toast.error("Username already exists.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="">
    <div className="hidden md:block h-[100vh] w-[100%] over">
      <div className=" container mx-auto w-full relative">
       
        <div className="absolute -bottom-[400px] -left-[400px]">
          <img src={circle} alt="" className="h-[500px]" />
        </div>
        <div className="absolute -top-16 -left-52">
          <img src={grey} alt="" className="h-[300px]" />
        </div>
        <div className="absolute -top-52 -right-[390px]">
          <img src={circle2} alt="" className="h-[400px]" />
        </div>

        <div className="absolute -bottom-52  -right-64">
          <img src={pink} alt="" className="h-[400px]" />
        </div>
          <Navbar/>
          <div className="px-6 my-8">
            <Tab/>
        <div className="flex justify-center ">
          <div className="w-full xl:w-[85%] border-[20px] shadow-2xl rounded-xl border-white h-[74vh] lg:w-11/12 flex overflow-hidden">
            {/* Image Section */}
            <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover">
              <img src={cow} alt="" className="rounded-lg h-full" />
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 bg-white p-5">
            <img src={logo} alt="" className="h-20"/>

              <form
                onSubmit={handleSubmit}
                className="px-8 my-14 pb-8 mb-4 bg-white rounded"
              >
                <div className=" -mt-5 pl-5">
                  <h1 className="text-start font-bold uppercase pl-12 text-rose-500 ">
                    Welcome...! consumer account register here
                  </h1>
                  <h3 className="text-7xl font-extrabold text-center">
                    Get Started
                  </h3>
                  <p className="text-sm text-grey text-start pl-14 mt-2">
                    Already Have an Account?
                    <Link
                      to="/adminlogin"
                      className="text-rose-500 font-semibold pl-2"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                <div className="my-10 w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="username"
                    >
                      Username
                    </label>
                  </div>
                  <input
                    className="w-full px-3 py-3 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="my-10 w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="password"
                    >
                       MobileNumber
                    </label>
                  </div>
                  <input
                    className="w-full px-3 py-3 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="phonenumber"
                    name="phonenumber"
                    type="number"
                    placeholder="Mobile Number"
                    onChange={(e) => setPhonenumber(e.target.value)}
                    required
                  />
                </div>


                <div className="my-10 w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    className="w-full px-3 py-3 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
            
                <div className="mb-6 w-96 mx-auto text-center">
                  <button
                    className="w-full px-4 py-3 font-bold text-white bg-rose-500 rounded-full hover:bg-grey focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

          </div>
      </div>
    </div>
    <div className="md:hidden">
        <MobileAdminsignup/>
    </div>
    </div>
  );
};

export default AdminRegisterForm;