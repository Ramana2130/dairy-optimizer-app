import React, { useEffect, useState } from "react";
import cow from "../assets/cow.jpg";
import grey from "../assets/grey.png";
import pink from "../assets/pink.png";
import circle from "../assets/circle.png";
import circle2 from "../assets/circle2.png";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import toast from "react-hot-toast";
import { isAuthenticated } from "../utils/authUtils";
import logo from '../assets/logo.svg';
import Navbar from "../Components/Navbar";
import Tab from "../Components/Tab";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        navigate(`/admindashboard/${userId}`);
      } else {
        navigate("/adminlogin");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post("http://localhost:3000/admin/login", {
        username,
        password,
      });
      const response = request.data;
      const token = response.token;
      const userId = response.userId;

      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        navigate(`/admindashboard/${userId}`);
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // If error response from the backend
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred. Please try again.");
      } else {
        // If error is not from the backend
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100%] over">
      <Navbar/>
      <div className="container mx-auto w-full relative">
        <div className="absolute -bottom-[440px] -left-[380px]">
          <img src={circle} alt="" className="h-[500px]" />
        </div>
        <div className="absolute -top-52 -left-52">
          <img src={grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -top-80 -right-[390px]">
          <img src={circle2} alt="" className="h-[400px]" />
        </div>

        <div className="absolute -bottom-52  -right-64">
          <img src={pink} alt="" className="h-[400px]" />
        </div>
        <div className=" px-6 my-8">


          <Tab/>
        <div className="flex justify-center">
          <div className="w-full xl:w-[85%] border-[20px] rounded-xl border-white shadow-2xl  h-[74vh] lg:w-11/12 flex">
            <div className="w-full h-autohidden lg:block lg:w-1/2 bg-cover">
              <img src={cow} alt="" className="rounded-lg h-full" />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-5">
              <img src={logo} alt="" className="h-20"/>
              <form
                onSubmit={handleSubmit}
                className="px-8 my-14 pb-8 mb-4 bg-white rounded"
              >
                <div className="pt-4 mb-16 pl-5">
                  <h1 className="text-start font-bold  pl-12 text-rose-500 uppercase ">
                    Welcome.! Consumer account Login Here..!
                  </h1>

                  <h3 className=" text-7xl font-extrabold text-center ">
                    Get Started
                  </h3>
                  <p className="text-sm text-grey text-start pl-14 mt-2 ">
                    Create an Account !
                    <Link
                      to="/adminregister"
                      className="text-rose-500 font-semibold pl-2 "
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div className="w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-rose-500"
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
                      className="block mb-2 text-sm font-medium text-rose-500"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    className="w-full px-3 py-4 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter Your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6 w-96 mx-auto text-center">
                  <button
                    className="w-full px-4 py-3 font-bold text-white bg-rose-500 rounded-full hover:bg-grey focus:outline-none focus:shadow-outline"
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
  );
};

export default AdminLogin;