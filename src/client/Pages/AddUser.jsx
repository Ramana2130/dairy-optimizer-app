import React, { useState } from 'react';
import SideBar from '../Components/SideBar';
import Statistics from './Statistics';
import '../index.css'
import Grey from '../assets/grey.png'
import pink from '../assets/pink.png'
import circle2 from "../assets/circle2.png";
import circle from "../assets/circle.png";
import Graph from './Graph';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import form from '../assets/form.svg'
import women from '../assets/women.png'
import { UserRoundPen } from 'lucide-react';
const AddUser = () => {
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [doorno, setDoorno] = useState('');
  const [streetaddress, setStreetaddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryschedule, setDeliveryschedule] = useState('');
  const [maxrequiredquantity, setMaxrequiredquantity] = useState('');

  const {userId} = useParams();
  const navigate= useNavigate();

  if(userId) {
    localStorage.getItem("userId")
  }

  const handleSubmit=async(e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem("userId")
      const response = await axios.post('http://localhost:3000/customer/addcustomer',{
        adminId,
        username,
        phonenumber,
        password,
        doorno,
        streetaddress,
        city,
        pincode,
        deliveryschedule,
        maxrequiredquantity
      })
      console.log(response.data);
      if(response.status === 200) {
        toast.success(response.data.message);
        navigate(`/${userId}/users`)
      }
      // toast.error(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-[100vh]   flex  over">
      <SideBar />

      <div className="flex w-[100%]  items-center overflow-hidden justify-center  relative">
        <div className="absolute -top-20 -left-10">
          <img src={Grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-24 -right-16">
          <img src={pink} alt="" className="h-[350px]" />
        </div>

        {/* <div>         */}
        <div className="mx-auto flex shadow-2xl  space-x-10 space-x-5  w-[90%]  items-center rounded-xl bg-white/10 backdrop-blur p-10 py-10  ">
        <div className='w-[50%]'>

  
        <div className="p-5 mx-auto flex justify-center leading-6 font-medium text-gray-900">
                        <div
                          className="py-1.5 px-3  flex justify-center  items-center gap-1 
        
                          bg-transparent border-b border-rose-500   text-rose-500   uppercase font-bold"
                          
                        >
                          <span className="font-medium text-center text-2xl flex"><UserRoundPen  className="h-8 mr-2"/> Vendor Personal Information</span>
                        </div>
                      </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <label
                htmlFor="name"
                className=" absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                id="name"
                // placeholder="Enter Customer Name"
                required
                className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="phone"
                className="absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
              >
                Phone Number
              </label>
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                // placeholder="Enter Customer phone number"
                required
                className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="phone"
                className="absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                // placeholder="Create a Password"
                required
                className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-5 pt-3">
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-2 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      Door No
                    </label>
                    <input
                       type="text"
                      name="doorno"
                      id="doorno"
                      // placeholder="Enter Door No"
                      required                
                      className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                      onChange={(e) => setDoorno(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-4 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      Street Address
                    </label>
                    <input
                       type="text"
                      name="streetaddress"
                      id="streetaddress"
                      // placeholder="Enter Street"
                      required
                      className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                      onChange={(e) => setStreetaddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-4 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      City
                    </label>
                    <input
                       type="text"
                      name="city"
                      id="city"
                      // placeholder="Enter City"
                      required
                      className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-2 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      PinCode
                    </label>
                    <input
                      type="number"
                      name="pincode"
                      id="pincode"
                      // placeholder="Enter Pincode"
                      required                  
                      className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5 relative">
              <label htmlFor="phone" className= "absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium ">
                Delevery Schedule
              </label>
            
              <select
              id="deliveryschedule"
              name="deliveryschedule" 
              // placeholder="Enter Deliveryschedule"
              required      
            className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md  px-5"
            onChange={(e) => setDeliveryschedule(e.target.value)}
             >          
            <option  className='bg-white text-black ' value="" >Select a day</option>
            <option  className='bg-white text-black ' value="both">Both</option>        
            <option  className='bg-white text-black ' value="morning">Morning</option>
            <option  className='bg-white text-black ' value="evening">Evening</option>
          </select>
 
            </div>
            <div className="mb-5 relative">
              <label htmlFor="phone" className= "absolute  text-black  bg-white/5 -top-3  left-5  mb-3 block text-base font-medium ">
                Maximum Required Quantity
              </label>
              <input
                type="number"
                name="maxrequiredquantity"
                id="maxrequiredquantity"
                // placeholder="Enter customer maximum quantity"
                required
                className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                onChange={(e) => setMaxrequiredquantity(e.target.value)}
              />
            </div>
            </div>

            <div>
              {" "}
              <button
                  className="hover:shadow-form w-full rounded-md bg-rose-500 py-3 px-8 text-center text-base font-semibold text-white hover:bg-white hover:border hover:border-rose-500 hover:text-black outline-none"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
        <div className='px-5'>
          {/* <img src={search} alt="" className='h-44 flex justify-center'  /> */}
          <img src={form} alt="" className='h-[450px]' />

        </div>
        </div>
        </div>
      {/* </div> */}

    </div>
  );
};

export default AddUser;
