import React, { useState } from "react";
import cow from "../assets/cow4.jpg";
import grey from "../assets/brown.png";
import pink from "../assets/lightbrown.png";
import circle from "../assets/circleb.png";
import circle2 from "../assets/circle2b.png";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from '../assets/logo.svg'
import Navbar from "../Components/Navbar";

// import useSignup from "../hooks/userSignup";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // const {loading , signup} = useSignup();
  // const [confirmpassword, setConfirmpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    // await signup(username, password);
    try {
      const request = await axios.post("http://localhost:3000/auth/adduser", {
        username,
        phonenumber
      });
      const response = request.data;
      console.log(response);
      if (request.status == 200) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="h-[100vh] w-[100%] over1">
      <div className="container mx-auto w-full relative ">
      <div className="absolute -bottom-[400px] -left-[390px]">
          <img src={circle} alt="" className="h-[500px]" />
        </div>
        <div className="absolute -top-16 -left-52">
          <img src={grey} alt="" className="h-[300px]" />
        </div>
        <div className="absolute -top-52 -right-[390px]">
          <img src={circle2} alt="" className="h-[400px]" />
        </div>

        <div className="absolute -bottom-52  -right-56">
          <img src={pink} alt="" className="h-[400px]" />
        </div>
          <Navbar/>
        <div className="flex justify-center px-6 my-20">
          <div className="w-full xl:w-[85%] border-[20px] rounded-xl border-white h-[74vh] lg:w-11/12 flex overflow-hidden">
            <div className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover">
              <img src={cow} alt="" className="rounded-lg h-full" />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-5">
            <img src={logo} alt="" className="h-20"/>

              <form
                onSubmit={handleSubmit}
                className="px-8 my-14 pb-8 mb-4 bg-white rounded"
              >
                <div className="pt-4 mb-16 pl-5">
                  <h1 className="text-start font-bold  pl-12 text-lightbrown uppercase ">
                    Sign Up
                  </h1>
                  <h3 className="text-7xl font-extrabold text-center">
                    Get Started
                  </h3>
                  <p className="text-sm text-grey text-start pl-14 mt-2">
                    Already Have Account?
                    <Link to={"/login"} className="text-brown font-semibold pl-2">
                      Sign in
                    </Link>
                  </p>
                </div>
                <div className="my-10 w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-brown"
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
                  />
                </div>
                <div className="my-10 w-96 mx-auto relative">
                  <div className="absolute -top-3 left-3 bg-white z-10">
                    <label
                      className="block mb-2 text-sm font-medium text-brown"
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
                  />
                </div>
                {/* <div className="my-10 w-96 mx-auto relative">
                <div className="absolute -top-3 left-3 bg-white z-10">
                  <label className="block mb-2 text-sm font-medium text-brown" htmlFor="mobilenumber">
                    Mobile Number
                  </label>
                </div>

                <input
                  className="w-full px-3 py-3 text-sm text-black border border-opacity-40 border-grey rounded-xl shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="phonenumber"
                  type="phonenumber"
                  name="phonenumber"
                  placeholder="Enter Your Mobile number"
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </div> */}
                <div className="mb-6 w-96 mx-auto text-center">
                  <button
                    className="w-full px-4 py-3 font-bold text-white bg-brown rounded-full hover:bg-grey focus:outline-none focus:shadow-outline"
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
  );
};

export default Signup;
