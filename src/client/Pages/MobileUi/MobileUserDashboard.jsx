import React from 'react';
import MobileNavbar from '../../Components/Mobile/MobileNavbar';
import { IndianRupee, Milk } from 'lucide-react';
import MobileUserMiniStatement from '../../Components/Mobile/MobileUserMiniStatement';
import Calendar from '../Calendar';
import ConsumerDetails from '../ConsumerDetails';

const MobileUserDashboard = () => {
  return (
    <div className="relative">
      <MobileNavbar />
      <div className="pt-12">
        <div className="p-3 shadow-2xl mx-2">
          <h1 className="text-3xl text-start ml-5 font-extrabold text-black">
            Hello {"kabi" || 'User'}!👋
          </h1>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <div className="relative flex items-center justify-between red shadow h-[140px] w-[350px] rounded-xl text-white">
              <div className="flex items-center justify-between px-10">
                <div className="p-1">
                  <IndianRupee className="p-2 rounded-full size-24 bg-red-900/60" />
                </div>
                <div className="text-end">
                  <h1 className="text-white/60 font-medium text-xl">Total Income</h1>
                  <h1 className="text-white font-extrabold text-5xl">
                    24 <span className="text-2xl">₹</span>
                  </h1>
                  <h1 className="text-white/60 font-semibold text-xs">Per Month</h1>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-between blue shadow h-[140px] w-[350px] rounded-xl text-white">
              <div className="flex items-center justify-between px-10">
                <div className="p-1">
                  <Milk className="p-2 rounded-full size-24 bg-blue-900/60" />
                </div>
                <div className="text-end">
                  <h1 className="text-white/60 font-medium text-xl">Total Quantity</h1>
                  <h1 className="text-white font-extrabold text-5xl">
                    52 <span className="text-2xl">Ltr</span>
                  </h1>
                  <h1 className="text-white/60 font-semibold text-xs">Per Month</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileUserMiniStatement />
        <ConsumerDetails />
        <Calendar />
      </div>
    </div>
  );
};

export default MobileUserDashboard;
