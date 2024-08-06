import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Statistics from "./Statistics";
import "../index.css";
import Grey from "../assets/grey.png";
import pink from "../assets/pink.png";
import Graph from "./Graph";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import transfer from '../assets/transfer.svg'
import { Milk } from "lucide-react";
const StatementForm = () => {
  const {userId, customerId} = useParams();
  if(userId) {
    localStorage.getItem("userId")
  } 

  const [username, setUsername] = useState('');
  const [deliveryschedule, setDeliveryschedule] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQunatity] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (customerId) {
        console.log("Fetching details for userId:", customerId);
        axios.get(`http://localhost:3000/customer/getcustomer/${customerId}`)
            .then(response => {
                const { data } = response;
                if (data.success) {
                    console.log("Customer data:", data.customer);
                    setUsername(data.customer.username);
                    setAddress(data.customer.streetaddress);
                } else {
                    toast.error(data.message || "Failed to fetch customer details");
                }
            })
            .catch(error => {
                console.log("Error fetching customer details:", error);
                toast.error("Failed to fetch customer details");
            });
    } else {
        console.log("customer is not defined");
    }
}, [userId]);

  const handleSubmit=async(e)=> {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/milk/add`, {

        adminId: userId,customerId,username, deliveryschedule,address,quantity,price
      })
      console.log(response);
      if(response.status === 200) {
        toast.success(response.data.message)
        navigate(`/history/${userId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-[100vh]  flex  over">
      <SideBar />

      <div className="flex w-[100%] items-center  overflow-hidden justify-center  relative">
        <div className="absolute -top-20 -left-10">
          <img src={Grey} alt="" className="h-[350px]" />
        </div>
        <div className="absolute -bottom-24 -right-16">
          <img src={pink} alt="" className="h-[350px]" />
        </div>

        <div className="mx-auto shadow-lg  rounded-xl backdrop-blur-3xl p-10 py-10 w-[80%] flex ">
          <div className="w-[40%]">

          <div className="p-5 mx-auto flex justify-center leading-6 font-medium text-gray-900">
                      <div
                        className="py-1.5 px-3  flex justify-center  items-center gap-1 
      
                        bg-transparent border-b border-rose-500   text-rose-500   uppercase font-bold"
                        
                      >
                        <span className="font-medium text-center text-2xl flex"><Milk className="h-8 mr-2"/> Add Milk Statement</span>
                      </div>
                    </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <label
                htmlFor="name"
                className=" absolute  text-blackd  -top-3  left-5  mb-3 block text-base font-medium "
                
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                // placeholder="User Name"
                value={username}
                readOnly

                className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="streetaddress"
                className=" absolute  text-blackd  -top-3  left-5  mb-3 block text-base font-medium "
                
              >
                Street Address
              </label>
              <input
                type="text"
                name="streetaddress"
                id="streetaddress"
                // placeholder="User Address"
                value={address}
                readOnly
                className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-5 pt-3">
              <div className="-mx-3 flex flex-wrap"></div>
              <div className="mb-5 relative">
                <label
                  htmlFor="phone"
                  className="absolute  text-blackd  -top-3  left-5  mb-3 block text-base font-medium "
                >
                  Delevery Schedule
                </label>
                

                <select onChange={(e) => setDeliveryschedule(e.target.value)} className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md  px-5">
                  
                <option  className='bg-white text-black ' value="" >Select a day</option>
            {/* <option  className='bg-white text-black ' value="both">Both</option>         */}
            <option  className='bg-white text-black ' value="morning">Morning</option>
            <option  className='bg-white text-black ' value="evening">Evening</option>
          
                </select>
              </div>
              <div className="mb-5 relative">
                <label
                  htmlFor="phone"
                  className="absolute  text-blackd  -top-3  left-5  mb-3 block text-base font-medium "
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  // placeholder="Enter user quantity"
                  className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                  onChange={(e) => setQunatity(e.target.value)}
                />
              </div>
              <div className="mb-5 relative">
                <label
                  htmlFor="phone"
                  className="absolute  text-blackd  -top-3  left-5  mb-3 block text-base font-medium "
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  // placeholder="Enter the Price"
                  className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div>
              {" "}
              <button 
                            className="hover:shadow-form w-full rounded-md bg-rose-500 py-3 px-8 text-center text-base font-semibold text-white hover:bg-white hover:border hover:border-rose-500 hover:text-black outline-none"

              >
                Submit
              </button>
            </div>
          </form>
          </div>
          <div className="w-[60%] px-2 flex justify-center">
          <img src={transfer} alt=""  className="h-[450px]"/>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default StatementForm;
