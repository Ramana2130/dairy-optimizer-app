import React from 'react';
import { useLocation } from 'react-router-dom';
import nxtgen from '../assets/nxtgen.png';

const Footer = () => {
  const location = useLocation();
  
  
  const isHome = location.pathname === '/';

  return (
    <div className={isHome ? ' z-50 p-2  border-t ' : 'bg-white p-4 '}>
      <div className="text-center pt-4">
        <a href="#" className={`flex items-center justify-center mb-4 text-2xl font-semibold ${isHome ? 'text-gray-900' : 'text-black'}`}>
          <img src={nxtgen} alt="NxtGen Logo" className='h-7' />
        </a>

        <span className={`block text-sm ${isHome ? 'text-black' : 'text-black'}`}>
          © 2024 NxtGen™. All Rights Reserved.
          Built with{' '}
          <a href="#" className={`text-rose-500 hover:underline ${isHome ? 'text-rose-500' : 'text-black'}`}>MERN Stack</a> and{' '}
          <a href="https://tailwindcss.com" className={`text-rose-500 hover:underline ${isHome ? 'text-rose-500' : 'text-black'}`}>Tailwind CSS</a>.
        </span>
      </div>
    </div>
  );
}

export default Footer;
