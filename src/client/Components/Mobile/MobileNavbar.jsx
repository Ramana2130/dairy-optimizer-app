import React, { useState } from 'react';
import { ClipboardList, House, IndianRupee, ListFilter, LogOut, Mail, X } from 'lucide-react';
import logo from '../../assets/logo1.svg';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white text-white flex justify-between p-3">
      <button onClick={toggleMenu} className="md:hidden">
        {isMenuOpen ? <X  className='text-black'/> : <ListFilter className='text-black'/>}
      </button>
      {isMenuOpen && (
        <div className="absolute h-screen top-12 left-0 right-0 bg-white">
          <img src={logo} alt="Logo" className="h-28 mt-10 mx-auto" />
          <div className="flex flex-col justify-center mx-5 mt-32 p-4">
            <a href="/userdashboard" className="text-black font-medium text-2xl py-2 flex">  <House  className='mr-3'/> OverView</a>
            <a href="/userdashboard" className="text-black font-medium text-2xl py-2 flex">   <ClipboardList  className='mr-3'/> Statement</a>
            <a href="/userdashboard" className="text-black font-medium text-2xl py-2 flex"><IndianRupee  className='mr-3'/>Income</a>
            <a href="/userdashboard" className="text-black font-medium text-2xl py-2 flex"><Mail  className='mr-3'/>Inbox</a>
            <a href="/userdashboard" className="text-black font-medium text-2xl py-2 flex"><LogOut  className='mr-3'/>Log Out</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
