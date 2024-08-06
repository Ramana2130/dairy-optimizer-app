import React, { useState } from "react";
import UsersideNavbar from "../Components/UserSideNavbar";
import IncomeUserTable from "../Components/IncomeUserTable";
import Grey from '../assets/black2.png';
import pink from "../assets/black.png";
const IncomeUser = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyQuantity, setMonthlyQuantity] = useState(0);

  return (
    <div className="h-[100vh] bg-white flex overflow-hidden">
      <UsersideNavbar />
      <div className="w-[100%] h-full relative overflow-hidden ">
      <div className="absolute -top-20 -left-10">
        <img src={Grey} alt="" className="h-[350px]" />
      </div>
      <div className="absolute -bottom-24 -right-16">
        <img src={pink} alt="" className="h-[350px]" />
      </div>
      <div className="h-full flex items-center justify-center">

        <IncomeUserTable 
          setMonthlyIncome={setMonthlyIncome} 
          setMonthlyQuantity={setMonthlyQuantity} 
          />
          </div>
      </div>
      
    </div>
  );
};

export default IncomeUser;
