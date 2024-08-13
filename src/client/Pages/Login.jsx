import React, { useEffect, useState } from "react";
import cow from "../assets/cow3.jpg";
import grey from "../assets/grey.png";
import pink from "../assets/lightbrown.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circleb.png";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import toast from "react-hot-toast";
import logo from '../assets/logo.svg';
import Navbar from "../Components/Navbar";
import { isAuthenticated } from "../utils/authUtils";
import Tab from "../Components/Tab";

import MobileUserLogin from "./MobileUi/MobileUserLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const customerId = localStorage.getItem("customerId");

      if (customerId) {
        navigate(`/userdashboard/${customerId}`);
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/customer/login", {
        username,
        password,
      });

      console.log(response.data);

      const { success, message, token, customerId, userId } = response.data;

      if (success) {
        toast.success(message);
        localStorage.setItem("token", token);
        localStorage.setItem("customerId", customerId);
        localStorage.setItem("userId", userId); // Store userId if needed

        // Navigate to the user dashboard
        navigate(`/userdashboard/${customerId}`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred. Please try again.");
      } else if (error.request) {
        toast.error("No response from server. Please check your network connection.");
      } else {
        toast.error("Error in setting up the request. Please try again.");
      }
      console.error('Axios error:', error);
    }
  };

  return (
    <div>

    <div className="hidden md:block h-[100vh] w-[100%] over1">
      <div className="container mx-auto w-full relative">
        <div className="absolute -bottom-[400px] -left-[390px]">
          <img src={circle} alt="" className="h-[500px]" />
        </div>
        <div className="absolute -top-16 -left-64">
          <img src={grey} alt="" className="h-[400px]" />
        </div>
        <div className="absolute -top-48 -right-[390px]">
          <img src={circle2} alt="" className="h-[500px]" />
        </div>
        <div className="absolute -bottom-52 -right-64">
          <img src={pink} alt="" className="h-[400px]" />
        </div>
        <Navbar />
        <div className=" px-6 my-8">
       <Tab/>
        <div className="flex justify-center ">
          <div className="pm ruw-full xl:w-[85%] border-[20px] border-white shadow-2xl h-[74vh] lg:w-11/12 flex">
            <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover">
              <img src={cow} alt="Cow" className="rounded-xl h-full" />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-5">
              <img src={logo} alt="Logo" className="h-20" />
              <form className="px-8 my-14 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="pt-4 mb-16 pl-5">
                  <h1 className="text-start font-bold pl-12 text-grey uppercase">
                    Sign In
                  </h1>
                  <h3 className="text-7xl font-extrabold text-center">
                    Get Started
                  </h3>
                 
                </div>

                <div className="w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-grey"
                      htmlFor="username"
                    >
                      Username
                    </label>
                  </div>
                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter Your Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="my-8 w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-grey"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6 w-96 mx-auto text-center">
                  <button
                    className="w-full px-4 py-3 font-bold text-white bg-grey rounded-full hover:bg-grey focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
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
        <MobileUserLogin/>
    </div>
    </div>

  );
};

export default Login;