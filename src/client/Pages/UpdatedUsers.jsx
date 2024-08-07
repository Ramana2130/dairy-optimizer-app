import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import SideBar from '../Components/SideBar';
import Statistics from './Statistics';
import '../index.css';
import Grey from '../assets/grey.png';
import pink from '../assets/pink.png';
import Graph from './Graph';
import { CircleUser, UserPen, UserRoundPen } from 'lucide-react';
import update from '../assets/update.svg'
const UpdateUser = () => {
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [doorno, setDoorno] = useState('');
  const [streetaddress, setStreetaddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryschedule, setDeliveryschedule] = useState('');
  const [maxrequiredquantity, setMaxrequiredquantity] = useState('');

  const { userId, customerId } = useParams();
  if(userId) {
    localStorage.getItem("userId")
  } 
  const navigate = useNavigate();

  useEffect(() => {   
    axios.get(`http://localhost:3000/customer/getcustomer/${customerId}`)
      .then(response => {
        const { data } = response;
        setUsername(data.customer.username);
        setPhonenumber(data.customer.phonenumber);
        // setPassword(data.customer.password);
        setDoorno(data.customer.doorno);
        setStreetaddress(data.customer.streetaddress);
        setCity(data.customer.city);
        setPincode(data.customer.pincode);
        setDeliveryschedule(data.customer.deliveryschedule);
        setMaxrequiredquantity(data.customer.maxrequiredquantity);
      })
      .catch(error => console.log(error));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:3000/customer/update/${customerId}`, {
            username,
            phonenumber: Number(phonenumber),
            password,
            doorno,
            streetaddress,
            city,
            pincode: Number(pincode),
            deliveryschedule,
            maxrequiredquantity: Number(maxrequiredquantity)
        });
        console.log("Response from server:", response.data);
        if (response.status === 200) {
            toast.success(response.data.message);
            navigate(`/${userId}/users`);
        }
    } catch (error) {
        console.log("Error updating user:", error.response ? error.response.data : error.message);
        toast.error("Failed to update user");
    }
  };

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
      <div className="mx-auto flex shadow-2xl  space-x-10 space-x-5  w-[90%]  items-center rounded-xl bg-white/10 backdrop-blur-3xl p-10 py-10  ">
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
              value={username}
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
              value={phonenumber}
              // placeholder="Enter Customer phone number"
              required
              className="w-full rounded-xl  border-opacity-40 border-grey border    bg-transparent  py-2 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-pink focus:shadow-md"
              onChange={(e) => setPhonenumber(e.target.value)}
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
                    value={doorno}
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
                    value={streetaddress}
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
                    value={city}
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
                    value={pincode}
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
            value={deliveryschedule}
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
              value={maxrequiredquantity}
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
              Update Vendor
            </button>
          </div>
        </form>
      </div>
      <div className='px-5'>
        {/* <img src={search} alt="" className='h-44 flex justify-center'  /> */}
        <img src={update} alt="" className='h-[400px]' />

      </div>
      </div>
      </div>
    {/* </div> */}

  </div>
  );
};

export default UpdateUser;