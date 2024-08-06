import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Statistics from "./Statistics";  
import "../index.css";
import form from "../assets/team.svg";
import Grey from '../assets/grey.png'
import pink from '../assets/pink.png'
import Graph from "./Graph";
import circle2 from "../assets/circle2.png";
import circle from "../assets/circle.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CircleUser, UserRoundPen } from "lucide-react";

const AdminProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure userId is fetched correctly
    if (!userId) {
      toast.error('Invalid User ID.');
      navigate('/login'); // Redirect if userId is not available
      return;
    }

    console.log('Fetching user with userId:', userId);
    axios.get(`http://localhost:3000/admin/getuser/${userId}`)
      .then(response => {
        const { username, password, phonenumber } = response.data.user;
        setUsername(username);
        setPassword(password);
        setPhonenumber(phonenumber);
      })
      .catch(error => {
        console.error('Error fetching user:', error.response?.data || error.message);
        toast.error(`Failed to fetch user: ${error.response?.data?.message || 'An error occurred.'}`);
      });
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Invalid User ID.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3000/admin/update/${userId}`, {
        username,
        password,
        phonenumber
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        // navigate(`/admindash/${userId}`);
      }
    } catch (error) {
      console.error('Error response:', error.response?.data || error.message);
      toast.error(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
    }
  }

  return (
    <div className="h-[100vh] flex over">
      <SideBar />
      <div className=" w-[90%] h-[100vh] flex items-center justify-center  overflow-hidden  relative">
      <div className="absolute -top-20 -left-10">
          <img src={Grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-24 -right-16">
          <img src={pink} alt="" className="h-[350px]" />
        </div>
<div className="flex  h-[50vh] w-[50vw] border bg-white/10 items-center justify-center rounded-2xl shadow-2xl    backdrop-blur ">

        <div className="w-[70%] ">
    
        <div className="p-5 mx-auto flex justify-center leading-6 font-medium text-gray-900">
                        <div
                          className="py-1.5 px-3  flex justify-center  items-center gap-1 
        
                          bg-transparent border-b border-rose-500   text-rose-500   uppercase font-bold"
                          
                        >
                          <span className="font-medium text-center text-2xl flex"><CircleUser className="h-8 mr-2"/>Personal Information</span>
                        </div>
                      </div>
          <div className="mx-auto p-10 py-10  ">
           
            <form onSubmit={handleSubmit}>
              <div className="mb-5 relative">
                <label
                  htmlFor="username"
                  className="absolute text-black  -top-3 left-5 mb-3 block text-base font-medium"
                >
                  Admin username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border-opacity-40 border-white border bg-transparent py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                />
              </div>
              <div className="mb-5 relative">
                <label
                  htmlFor="phonenumber"
                  className="absolute text-black  -top-3 left-5 mb-3 block text-base font-medium"
                >
                   phonenumber
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  // placeholder=""
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="w-full rounded-xl border-opacity-40 border-white border bg-transparent py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                />
              </div>
    
              <div className="mb-5 relative">
                <label
                  htmlFor="password"
                  className="absolute text-black  -top-3 left-5 mb-3 block text-base font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-opacity-40 border-white border bg-transparent py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-rose-500 py-3 px-8 text-center text-base font-semibold text-white hover:bg-white hover:border hover:border-rose-500 hover:text-black outline-none"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="px-5">
          <img src={form} alt="" className="h-[350px]" />
        </div>
      </div>
</div>
 
    </div>
  );
};

export default AdminProfile;
