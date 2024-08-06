import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CircleUser, User } from 'lucide-react';

const ConsumerDetails = () => {
  const [adminName, setAdminName] = useState('');
  const [adminPhonenumber, setAdminPhonenumber] = useState('');
  
  const { customerId } = useParams();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/customer/${customerId}/details`);
        const data = response.data.admin;
        setAdminName(data.username);
        setAdminPhonenumber(data.phonenumber);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }
    fetchAdminData();
  }, [customerId]);

  return (
    <div className="flex mt-24 items-center justify-center">
{/* <<<<<<< HEAD */}
      <div className="bg-white flex justify-center border h-[320px] w-96 shadow-2xl relative overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all mx-7 duration-500 transform">
        <div className="flex-row  items-center">
     <CircleUser     className="w-40 h-40 rounded-full " />
          {/* <div className=""> */}
            <p className="text-gray-800 text-center">Consumer</p>
            <h1 className="text-black text-center text-2xl font-bold">
              Name:{adminName}
            </h1>
            <p className="text-xl font-bold text-center text-black transition-opacity duration-500">
              Mobile:{adminPhonenumber}123456789
            </p>
          </div>
        </div>
{/* ======= */}
    
        
{/* >>>>>>> 8b4c30f (consumer Dashboard Modify) */}

      </div>
    
  )
}

export default ConsumerDetails;
