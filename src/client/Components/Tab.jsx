import { ContactRound, Shield } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Tab = () => {
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
    <div className="flex items-center ml-64 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:text-gray-800">
      <Link
        to="/adminlogin"
        tabIndex={0}
        className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-lg1 ${
          activeTab === "consumer"
            ? "border-2 border-b-0  w-42  rounded-md border-rose-500 text-rose-500 "
            : "border-b dark:border-black dark:text-black"
        }`}
        rel="noopener noreferrer"
      >
        <Shield />
        <span>Consumer</span>
      </Link>
      <Link
        to="/login"
        tabIndex={0}
        className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-lg1 ${
          activeTab === "vendor"
            ? "border-2 border-b-0  w-42 rounded-md border-rose-500 text-rose-500 "
            : "border-b-2 rounded-t-lg dark:border-black dark:text-black"
        }`}
        rel="noopener noreferrer"
      >
        <ContactRound />
        <span>Vendor</span>
      </Link>
    </div>
  );
};

export default Tab;
