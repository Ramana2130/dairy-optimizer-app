import React from "react";
import { IndianRupee, Milk, BadgeIndianRupee, SquarePlus, TrendingUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CountUp from 'react-countup';
import '../index.css';


const Statistics = () => {
  const {userId} = useParams();
  if(userId) {
    localStorage.getItem("userId")
  }
  return (
    <div className="rounded-xl h-[450px] my-auto w-[390px] mt-5 mx-12">
      <h1 className="text-grey text-xl font-medium pt-5 pl-12 flex">
        <span className="mr-3 text-rose-500">
          <TrendingUp />
        </span>
        Monthly Earnings/Quantity
      </h1>
      <div className="pt-5 grid grid-cols-2 gap-2 mx-8">
        <div className="bg-white/5 backdrop-blur-3xl border-grey/15 border shadow-2xl h-[150px] w-[150px] rounded-2xl">
          <div className="h-full justify-center items-center flex">
            <div>

          <h1 className=" text-rose-500"><BadgeIndianRupee  className="font-extrabold h-14 w-14"/></h1>
          <h1 className="text-lg text-center font-bold text-grey">Earnings</h1>

            <h1 className="text-grey text-xl text-center font-extrabold">
              <CountUp end={50} duration={2.5} />
              <span className="text-grey ml-1">$</span>
            </h1>
            </div>
          </div>
          
        </div>
        <div className="bg-white shadow-2xl border-grey/15 border h-[150px] w-[150px] rounded-2xl">
          <div className="h-full justify-center items-center flex">
            <div>

          <h1 className=" text-rose-500"><Milk  className="font-extrabold h-14 w-14"/></h1>
          <h1 className="text-lg text-center font-bold text-grey">Quantity</h1>

            <h1 className="text-grey text-xl text-center font-extrabold">
              <CountUp end={50} duration={2.5} />
              <span className="text-grey ml-1">Ltr</span>
            </h1>
            </div>
          </div>
          
        </div>

        
       
      </div>
      <div className="h-[200px] mt-5 w-[400px]  bg-white shadow-2xl border-grey/15 border rounded-xl">
      <h1 className="text-grey text-xl font-medium pt-8 pl-12 flex">
        <span className="mr-3 text-rose-500">
          <SquarePlus />
        </span>
        Add Milk with Customer
      </h1>
        <Link to={`/${userId}/users`} >
          <div className=" mt-10 w-full flex justify-center ">
        
          <div className="-mt-5">
         <h1 className=" text-rose-500 ml-5"><SquarePlus className="font-extrabold h-16 w-16"/></h1>

          </div>
          </div>
        </Link>
        </div>
    </div>
  );
};

export default Statistics;
