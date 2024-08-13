import React, { useEffect, useState } from 'react'
import UsersideNavbar from '../Components/UserSideNavbar'
import DayRange from './DayRange'
import Calendar from './Calendar'
import { Pencil } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import statement from '../assets/profileblack.svg'
import Grey from '../assets/black2.png';
import pink from "../assets/black.png";
const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [doorno, setDoorno] = useState('');
  const [streetaddress, setStreetaddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryschedule, setDeliveryschedule] = useState('');
  const [maxrequiredquantity, setMaxrequiredquantity] = useState('');


  const {customerId} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3000/customer/getcustomer/${customerId}`)
    .then(response => {
      const {username, password, phonenumber, doorno, streetaddress, city, pincode, deliveryschedule, maxrequiredquantity} = response.data.customer;
      setUsername(username)
      setPassword(password)
      setPhonenumber(phonenumber)
      setDoorno(doorno)
      setStreetaddress(streetaddress)
      setCity(city)
      setPincode(pincode)
      setDeliveryschedule(deliveryschedule)
      setMaxrequiredquantity(maxrequiredquantity)
    })
  },[customerId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/customer/update/${customerId}`,{
        username,
        password,
        phonenumber,
        doorno,
        streetaddress,
        city,
        pincode,
        deliveryschedule,
        maxrequiredquantity
      },{
        headers :{
           'Content-Type': 'application/json'
        }
      });
      if(response.status === 200) {
        toast.success(<b>{response.data.message}</b>)
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
    }
  }

  return (
    <div className="h-[100vh] relative bg-white flex overflow-hidden">
      <UsersideNavbar/>
      
      <div className="w-[100%]  overflow-hidden relative h-full flex justify-center"> 
      <div className="absolute -top-20 -left-10">
        <img src={Grey} alt="" className="h-[350px]" />
      </div>
      <div className="absolute -bottom-24 -right-16">
        <img src={pink} alt="" className="h-[350px]" />
      </div>
        <div className='flex border mt-36 justify-center w-[80%] h-full '>

        <div className='w-[50%]'>
      <div className="mx-auto shadow-lg bg-white/10 rounded-xl backdrop-blur-3xl p-10 py-10  ">
          <div className="mb-10 text-center ">
            <h1 className="font-light text-black text-3xl ">
              Personal Information
                       </h1>
          </div>
            {/* <div className='w-full flex mb-5  justify-end'>
              {" "}
              <button className="flex justify-end hover:shadow-form  rounded-md border   py-1  px-2 text-center text-base font-semibold text-black hover:border hover:bg-transparent hover:text-black outline-none">
            <Pencil />
              </button>
            </div> */}
          <form onSubmit={handleSubmit} >
            <div className="mb-5 relative">
              <label
                htmlFor="name"
                className=" absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="phone"
                className="absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
              >
                Phone Number
              </label>
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="phone"
                className="absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
              />
            </div>

            <div className="mb-5 pt-3">
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-2 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      Door No
                    </label>
                    <input
                       type="text"
                      name="doorno"
                      id="doorno"
                      value={doorno}
                      onChange={(e) => setDoorno(e.target.value)}
                      className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-4 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      Street Address
                    </label>
                    <input
                       type="text"
                      name="streetaddress"
                      id="streetaddress"
                      value={streetaddress}
                      onChange={(e) => setStreetaddress(e.target.value)}
                      className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-4 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      City
                    </label>
                    <input
                       type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-2 relative">
                    <label
                      htmlFor="time"
                      className=" absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium "
                    >
                      PinCode
                    </label>
                    <input
                      type="number"
                      name="pincode"
                      id="pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5 relative">
              <label htmlFor="phone" className= "absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium ">
                Delevery Schedule
              </label>
            
              <select
              id="deliveryschedule"
              name="deliveryschedule" 
              value={deliveryschedule} 
              onChange={(e) => setDeliveryschedule(e.target.value)}     
            className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md  px-5"
             >          
            <option  className='bg-white/80 text-black ' value="" >Select a day</option>
            <option  className='bg-white/80 text-black ' value="both">Both</option>        
            <option  className='bg-white/80 text-black ' value="morning">Morning</option>
            <option  className='bg-white/80 text-black ' value="evening">Evening</option>
          </select>
 
            </div>
            <div className="mb-5 relative">
              <label htmlFor="phone" className= "absolute  text-black  -top-3  left-5  mb-3 block text-base font-medium ">
                Maximum Required Quantity
              </label>
              <input
                type="number"
                name="maxrequiredquantity"
                id="maxrequiredquantity"
                value={maxrequiredquantity}
                onChange={(e) => setMaxrequiredquantity(e.target.value)}
                className="w-full rounded-xl  border-opacity-40 border-black border    bg-transparent  py-3 px-6 text-base font-medium text-black placeholder:text-black outline-none focus:border-white focus:shadow-md"
              />
            </div>
            </div>
            <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white hover:bg-transparent hover:border hover:border-black hover:text-black outline-none"
                >
                  Update Profile
                </button>
              </div>          
          </form>
        </div>
        </div>
        <div className='px-2 flex my-36'>
                  <img src={statement} alt=""  className='h-[500px]'/>
            </div>
        </div>


      </div>
     
      
    </div>
  )
}

export default UserProfile
