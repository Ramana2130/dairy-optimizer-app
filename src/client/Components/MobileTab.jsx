import { ContactRound, Shield } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileTab = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("consumer");

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveTab("vendor");
    } else {
      setActiveTab("consumer");
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center   overflow-x-auto overflow-y-hidden  flex-nowrap dark:text-gray-800">
      <Link
        to="/adminlogin"
        tabIndex={0}
        className={`flex items-center flex-shrink-0 px-1  py-3 space-x-2 text-sm ${
          activeTab === "consumer"
            ? "border-b-2   w-28  border-rose-500 text-rose-500 "
            : " text-rose-500/55"
        }`}
        rel="noopener noreferrer"
      >
        <Shield />
        <span>Consumer</span>
      </Link>
      <Link
        to="/login"
        tabIndex={0}
        className={`flex items-center flex-shrink-0 px-1  py-3 space-x-2 text-sm ${
          activeTab === "vendor"
            ? "border-b-2   w-28 border-grey text-grey "
            : " text-rose-500/55"
        }`}
        rel="noopener noreferrer"
      >
        <ContactRound />
        <span>Vendor</span>
      </Link>
    </div>
  );
};

export default MobileTab;
