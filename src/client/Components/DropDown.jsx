import React, { useEffect, useState } from 'react';
import { LogOut ,ChevronDown} from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import profile from '../assets/profile.png'
const DropDown = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();
  const {userId} = useParams();

  
  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        localStorage.getItem("userId");
        try {
          const response = await axios.get(`http://localhost:3000/admin/getuser/${userId}`);
          if (response.data.user) {
            setUsername(response.data.user.username);
            console.log(username)
          } else {
            toast.error('Failed to fetch username');
          }
        } catch (error) {
          toast.error('Failed to fetch username');
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUsername();
  }, []);

  const handleToggle = (index) => {
    setIsOpen(isOpen === index ? null : index); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId"); 
    navigate("/adminlogin"); 
    toast.success("Logout Successfully");
  };

  return (
    <ul className="flex flex-col shadow-2xl  rounded-full px-5 border gap-2 max-w-[280px] mx-auto ">
    
      <li>
        <details className="group">
          <summary
            className="flex items-center justify-between  gap-2 p-2 font-medium marker:content-none hover:cursor-pointer"
            onClick={() => handleToggle(0)}
          >
            <div>
              <img src={profile} alt="" className='h-8'/>
            </div>
            <div>

            <span className="flex gap-2 justify-end">
              <span className='text-grey uppercase text-xl'>{username || "Admin"}</span>
            </span>
            </div>
            <ChevronDown /> 
          </summary>
          <article className={`px-4 ${isOpen === 0 ? 'block absolute w-72 right-24 top-24' : ' hidden'}`}>
            <ul className="flex justify-center gap-4 pl-2 shadow-2xl bg-rose-500 rounded-xl py-2 w-full ">
              <button 
                type="button" 
                onClick={handleLogout} 
                className="font-bold flex justify-center w-60 text-white text-sm px-2 py-1"
              >
                <span className='text-center font-bold text-xl mr-2'>Log Out</span>
                <span className='pt-1 font-bold'><LogOut /></span>
              </button>
            </ul>
          </article>
        </details>
      </li>
    </ul>
  );
};

export default DropDown;
