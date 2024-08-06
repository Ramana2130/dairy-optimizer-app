import React from "react";
import {
  LogOut,
  CircleUser,
  Mail,
  House,
  UserRoundPlus,
  ClipboardList,
  User,
  ChartSpline,
  IndianRupee,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.svg";
import toast from "react-hot-toast";

const UsersideNavbar = () => {
  const { customerId, userId } = useParams();
  console.log(customerId, userId);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("customerId");
    navigate("/login");
    toast.success("logout Successfully");
  };

  return (
    <div className="relative flex h-[100vh]  max-w-[20rem] flex-col  border-black/40 bg-clip-border p-4 text-grey border-r shadow-xl shadow-blue-gray-900/5">
      <div className="p-4 mb-2">
        <img src={logo} alt="" />
      </div>
      <nav className="flex min-w-[280px] flex-col gap-1 p-2 font-sans text-base font-medium text-black">
        <div className="relative block w-full">
          <div className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-black hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <button
              type="button"
              className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-900 hover:text-blue-gray-900"
            >
              <p className="block mr-auto font-sans text-md antialiased font-bold leading-relaxed text-blue-gray-900">
                Dashboard
              </p>
            </button>
          </div>
          <div className="overflow-hidden">
            <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700">
              <nav className="flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-black">
                <Link
                  to={`/userdashboard/${customerId}`}
                  className="flex items-center w-full p-3 hover:text-grey b transition-all rounded-lg outline-none text-start "
                >
                  <div className="grid mr-4 place-items-center">
                    <House />
                  </div>
                  OverView
                </Link>
                <Link
                  to={`/userstatement/${customerId}`}
                  className="flex items-center w-full p-3 hover:text-grey b  transition-all rounded-lg outline-none text-start "
                >
                  <div className="grid mr-4 place-items-center">
                    <ClipboardList />
                  </div>
                  Statement
                </Link>

                <Link
                  to={`/incomeuser/${customerId}`}
                  className="flex  items-center w-full p-3 hover:text-grey b  transition-all rounded-lg outline-none text-start "
                >
                  <div className="grid mr-4 place-items-center">
                    <IndianRupee />
                  </div>
                  Income
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <hr className="my-2 mt-[380px]  border-blue-gray-50" />
        <div className="flex  items-center w-full p-3 hover:text-grey b  transition-all rounded-lg outline-none text-start ">
          <div className="grid mr-4 place-items-center">
            <Mail />
          </div>
          Inbox
          <div className="grid ml-auto place-items-center justify-self-end">
            <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
              <span className="bg-black h-6 text-center py-1 w-6 text-white rounded-full">
                14
              </span>
            </div>
          </div>
        </div>
        <Link
          to={`/userprofile/${customerId}`}
          className="flex items-center w-full p-3 hover:text-grey b  transition-all rounded-lg outline-none text-start "
        >
          <div className="grid mr-4 place-items-center">
            <CircleUser />
          </div>
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 hover:text-grey b  transition-all rounded-lg outline-none text-start "
          type="button"
        >
          <div className="grid mr-4 place-items-center">
            <LogOut />
          </div>
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default UsersideNavbar;
