import React, { useEffect, useState } from "react";
import ball from '../assets/ball.png';
import { IndianRupee, Milk } from 'lucide-react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserBox = ({ monthlyIncome, monthlyQuantity }) => {
  const [customername, setCustomername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const customerId = localStorage.getItem('customerId');

        if (!(token && customerId)) {
          navigate('/login');
          return;
        }

        const customerResponse = await axios.get(`http://localhost:3000/customer/getcustomer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomername(customerResponse.data.customer.username);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        navigate('/login');
      }
    };

    fetchCustomerData();
  }, [navigate]);

  return (
    <div className="bg-white/20 backdrop-blur-3xl  shadow-2xl   mx-8 h-[40vh] border  rounded-3xl">
      <div className="p-10 relative">
        {/* <div className="absolute top-8 z-0 right-36">
          <img src={ball} alt="" className="h-52" />
        </div> */}

        <h1 className="text-md text-black font-semibold mb-5">Dashboard OverView</h1>
        <h1 className="text-5xl font-extrabold text-black">
          Hello {customername || 'User'}!👋
        </h1>
        <div className="mt-8 grid grid-cols-2">
          <div className="relative bg-gradient-to-r from-[#111111] to-[#000000] red shadow z-50 h-[180px] w-[450px] rounded-xl text-white">
            <div className="absolute rounded-3xl h-[10px] -bottom-2 bg-white/20 w-[420px] right-4"></div>
            <div className="p-7 flex items-center justify-between px-10">
              <div className="p-1">
                <IndianRupee className="p-2 rounded-full size-28 bg-red-900/60" />
              </div>
              <div className="text-end">
                <h1 className="text-white/60 font-medium text-xl">Total Income</h1>
                <h1 className="text-white font-extrabold text-5xl">
                  <span className="text-2xl">₹</span> {monthlyIncome.toFixed(2)}
                </h1>
                <h1 className="text-white/60 font-semibold text-xs">Per Month</h1>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-r from-[#111111] to-[#000000] blue shadow z-50 h-[180px] w-[450px] rounded-xl text-white">
            <div className="absolute rounded-3xl h-[10px] -bottom-2 bg-white/20 w-[420px] right-4"></div>
            <div className="p-7 flex items-center justify-between px-10">
              <div className="p-1">
                <Milk className="p-2 rounded-full size-28 bg-blue-900/60" />
              </div>
              <div className="text-end">
                <h1 className="text-white/60 font-medium text-xl">Total Quantity</h1>
                <h1 className="text-white font-extrabold text-5xl">
                  {monthlyQuantity} <span className="text-2xl">Ltr</span>
                </h1>
                <h1 className="text-white/60 font-semibold text-xs">Per Month</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
